import os
from typing import Dict, List, Optional
from fastapi import HTTPException, Request
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest
from donation_models import (
    Donation, 
    DonationCreate, 
    DonationPackage, 
    PaymentTransaction,
    DonationType, 
    DonationStatus, 
    PaymentStatus,
    CheckoutRequest,
    CheckoutResponse
)
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging
from datetime import datetime

class DonationService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.stripe_api_key = os.environ.get("STRIPE_API_KEY")
        if not self.stripe_api_key:
            raise ValueError("STRIPE_API_KEY environment variable is required")
        
        # Fixed donation packages - amounts are secure on backend
        self.packages = {
            "blessing": DonationPackage(
                id="blessing",
                name="Bénédiction",
                amount=25.0,
                description="Une petite bénédiction pour soutenir nos ministères",
                suggested=False
            ),
            "support": DonationPackage(
                id="support",
                name="Soutien",
                amount=50.0,
                description="Soutenez nos activités communautaires",
                suggested=True
            ),
            "generosity": DonationPackage(
                id="generosity",
                name="Générosité",
                amount=100.0,
                description="Un don généreux pour nos projets d'évangélisation",
                suggested=True
            ),
            "partnership": DonationPackage(
                id="partnership",
                name="Partenariat",
                amount=250.0,
                description="Devenez partenaire de notre mission",
                suggested=False
            ),
            "custom": DonationPackage(
                id="custom",
                name="Montant personnalisé",
                amount=0.0,
                description="Choisissez le montant de votre don",
                suggested=False
            )
        }

    def get_packages(self) -> List[DonationPackage]:
        """Get all available donation packages"""
        return list(self.packages.values())

    def get_package(self, package_id: str) -> Optional[DonationPackage]:
        """Get a specific donation package"""
        return self.packages.get(package_id)

    async def create_donation(
        self, 
        donation_data: DonationCreate, 
        user_id: Optional[str] = None,
        email: Optional[str] = None
    ) -> Donation:
        """Create a new donation record"""
        donation_dict = donation_data.dict()
        
        if user_id:
            donation_dict["user_id"] = user_id
        if email and not donation_dict.get("email"):
            donation_dict["email"] = email
        if donation_data.donor_email:
            donation_dict["email"] = donation_data.donor_email
            
        donation = Donation(**donation_dict)
        
        try:
            await self.db.donations.insert_one(donation.dict())
            logging.info(f"Created donation: {donation.id} for amount ${donation.amount}")
            return donation
        except Exception as e:
            logging.error(f"Error creating donation: {e}")
            raise HTTPException(status_code=500, detail="Error creating donation")

    async def create_checkout_session(
        self, 
        checkout_request: CheckoutRequest,
        user_id: Optional[str] = None,
        user_email: Optional[str] = None
    ) -> CheckoutResponse:
        """Create Stripe checkout session for donation"""
        
        # Determine donation amount
        if checkout_request.package_id:
            package = self.get_package(checkout_request.package_id)
            if not package:
                raise HTTPException(status_code=400, detail="Invalid donation package")
            
            if package.id == "custom":
                if not checkout_request.amount or checkout_request.amount <= 0:
                    raise HTTPException(status_code=400, detail="Amount required for custom donation")
                amount = float(checkout_request.amount)
            else:
                # Use secure server-side amount
                amount = package.amount
        else:
            if not checkout_request.amount or checkout_request.amount <= 0:
                raise HTTPException(status_code=400, detail="Amount required")
            amount = float(checkout_request.amount)

        # Create donation record
        donation_create = DonationCreate(
            amount=amount,
            donation_type=checkout_request.donation_type,
            message=checkout_request.message,
            anonymous=checkout_request.anonymous,
            donor_name=checkout_request.donor_name,
            donor_email=checkout_request.donor_email
        )
        
        donation = await self.create_donation(
            donation_create, 
            user_id=user_id, 
            email=user_email or checkout_request.donor_email
        )

        # Setup Stripe checkout
        host_url = checkout_request.origin_url
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url=webhook_url)

        # Build success and cancel URLs
        success_url = f"{host_url}/dons/succes?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{host_url}/dons"

        # Prepare metadata
        metadata = {
            "donation_id": donation.id,
            "donation_type": donation.donation_type,
            "source": "church_website"
        }
        
        if user_id:
            metadata["user_id"] = user_id
        if donation.donor_name:
            metadata["donor_name"] = donation.donor_name

        try:
            # Create Stripe checkout session
            checkout_session_request = CheckoutSessionRequest(
                amount=amount,
                currency="usd",
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=metadata
            )
            
            session = await stripe_checkout.create_checkout_session(checkout_session_request)
            
            # Create payment transaction record
            payment_transaction = PaymentTransaction(
                session_id=session.session_id,
                user_id=user_id,
                email=user_email or checkout_request.donor_email,
                amount=amount,
                currency="usd",
                donation_id=donation.id,
                metadata=metadata,
                payment_status=PaymentStatus.PENDING,
                status=DonationStatus.PENDING
            )
            
            await self.db.payment_transactions.insert_one(payment_transaction.dict())
            
            # Update donation with session ID
            await self.db.donations.update_one(
                {"id": donation.id},
                {"$set": {"payment_session_id": session.session_id}}
            )
            
            logging.info(f"Created checkout session {session.session_id} for donation {donation.id}")
            
            return CheckoutResponse(
                url=session.url,
                session_id=session.session_id,
                donation_id=donation.id
            )
            
        except Exception as e:
            logging.error(f"Error creating checkout session: {e}")
            # Clean up donation if checkout fails
            await self.db.donations.delete_one({"id": donation.id})
            raise HTTPException(status_code=500, detail="Error creating payment session")

    async def check_payment_status(self, session_id: str):
        """Check payment status from Stripe and update records"""
        
        # Check if already processed
        existing_transaction = await self.db.payment_transactions.find_one(
            {"session_id": session_id, "payment_status": PaymentStatus.PAID}
        )
        if existing_transaction:
            return {
                "status": "completed",
                "payment_status": "paid",
                "amount": existing_transaction["amount"],
                "currency": existing_transaction["currency"]
            }

        try:
            # Initialize Stripe checkout
            stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url="")
            
            # Get checkout status from Stripe
            checkout_status = await stripe_checkout.get_checkout_status(session_id)
            
            # Update payment transaction
            update_data = {
                "payment_status": PaymentStatus.PAID if checkout_status.payment_status == "paid" else PaymentStatus.FAILED,
                "updated_at": datetime.utcnow()
            }
            
            if checkout_status.payment_status == "paid":
                update_data["status"] = DonationStatus.COMPLETED
                update_data["completed_at"] = datetime.utcnow()
                
                # Update donation record
                transaction = await self.db.payment_transactions.find_one({"session_id": session_id})
                if transaction and transaction.get("donation_id"):
                    await self.db.donations.update_one(
                        {"id": transaction["donation_id"]},
                        {"$set": {
                            "payment_status": PaymentStatus.PAID,
                            "status": DonationStatus.COMPLETED,
                            "completed_at": datetime.utcnow()
                        }}
                    )
                    
                    # Update user donation total if user is logged in
                    if transaction.get("user_id"):
                        await self.update_user_donation_total(
                            transaction["user_id"], 
                            transaction["amount"]
                        )
            
            await self.db.payment_transactions.update_one(
                {"session_id": session_id},
                {"$set": update_data}
            )
            
            return {
                "status": checkout_status.status,
                "payment_status": checkout_status.payment_status,
                "amount": checkout_status.amount_total / 100,  # Convert from cents
                "currency": checkout_status.currency
            }
            
        except Exception as e:
            logging.error(f"Error checking payment status: {e}")
            raise HTTPException(status_code=500, detail="Error checking payment status")

    async def handle_webhook(self, request_body: bytes, stripe_signature: str):
        """Handle Stripe webhook events"""
        try:
            stripe_checkout = StripeCheckout(api_key=self.stripe_api_key, webhook_url="")
            webhook_response = await stripe_checkout.handle_webhook(request_body, stripe_signature)
            
            # Process webhook event
            if webhook_response.event_type == "checkout.session.completed":
                await self.check_payment_status(webhook_response.session_id)
                
            return {"status": "success"}
            
        except Exception as e:
            logging.error(f"Webhook error: {e}")
            raise HTTPException(status_code=400, detail="Webhook processing failed")

    async def update_user_donation_total(self, user_id: str, amount: float):
        """Update user's total donation amount"""
        try:
            # Get current total
            user = await self.db.users.find_one({"id": user_id})
            current_total = user.get("donation_total", 0.0) if user else 0.0
            
            # Update total
            new_total = current_total + amount
            await self.db.users.update_one(
                {"id": user_id},
                {"$set": {"donation_total": new_total, "updated_at": datetime.utcnow()}}
            )
            
            logging.info(f"Updated user {user_id} donation total to ${new_total}")
            
        except Exception as e:
            logging.error(f"Error updating user donation total: {e}")

    async def get_user_donations(self, user_id: str, limit: int = 20) -> List[Donation]:
        """Get user's donation history"""
        try:
            donations_cursor = self.db.donations.find(
                {"user_id": user_id}
            ).sort("created_at", -1).limit(limit)
            
            donations = await donations_cursor.to_list(length=limit)
            return [Donation(**donation) for donation in donations]
            
        except Exception as e:
            logging.error(f"Error getting user donations: {e}")
            return []

    async def get_donation_stats(self) -> Dict:
        """Get donation statistics for admin"""
        try:
            # Total donations
            total_pipeline = [
                {"$match": {"status": DonationStatus.COMPLETED}},
                {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
            ]
            total_result = await self.db.donations.aggregate(total_pipeline).to_list(length=1)
            total_amount = total_result[0]["total"] if total_result else 0
            total_count = total_result[0]["count"] if total_result else 0
            
            # Monthly donations
            monthly_pipeline = [
                {"$match": {
                    "status": DonationStatus.COMPLETED,
                    "completed_at": {
                        "$gte": datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
                    }
                }},
                {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
            ]
            monthly_result = await self.db.donations.aggregate(monthly_pipeline).to_list(length=1)
            monthly_amount = monthly_result[0]["total"] if monthly_result else 0
            monthly_count = monthly_result[0]["count"] if monthly_result else 0
            
            return {
                "total_amount": total_amount,
                "total_count": total_count,
                "monthly_amount": monthly_amount,
                "monthly_count": monthly_count
            }
            
        except Exception as e:
            logging.error(f"Error getting donation stats: {e}")
            return {"total_amount": 0, "total_count": 0, "monthly_amount": 0, "monthly_count": 0}