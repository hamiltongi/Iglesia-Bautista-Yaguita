from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class DonationType(str, Enum):
    ONE_TIME = "one_time"
    MONTHLY = "monthly"
    YEARLY = "yearly"

class DonationStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    EXPIRED = "expired"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    UNPAID = "unpaid"
    FAILED = "failed"

# Donation Models
class Donation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    email: Optional[EmailStr] = None
    donor_name: Optional[str] = None
    amount: float
    currency: str = "usd"
    donation_type: DonationType = DonationType.ONE_TIME
    message: Optional[str] = None
    anonymous: bool = False
    payment_session_id: Optional[str] = None
    payment_status: PaymentStatus = PaymentStatus.PENDING
    status: DonationStatus = DonationStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)

class DonationCreate(BaseModel):
    amount: float
    donation_type: DonationType = DonationType.ONE_TIME
    message: Optional[str] = None
    anonymous: bool = False
    donor_name: Optional[str] = None
    donor_email: Optional[EmailStr] = None

class DonationPackage(BaseModel):
    id: str
    name: str
    amount: float
    description: str
    suggested: bool = False

# Payment Transaction Models
class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    payment_id: Optional[str] = None
    user_id: Optional[str] = None
    email: Optional[str] = None
    amount: float
    currency: str = "usd"
    payment_status: PaymentStatus = PaymentStatus.PENDING
    status: DonationStatus = DonationStatus.PENDING
    donation_id: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None

class CheckoutRequest(BaseModel):
    package_id: Optional[str] = None
    amount: Optional[float] = None
    donation_type: DonationType = DonationType.ONE_TIME
    message: Optional[str] = None
    anonymous: bool = False
    donor_name: Optional[str] = None
    donor_email: Optional[EmailStr] = None
    origin_url: str

class CheckoutResponse(BaseModel):
    url: str
    session_id: str
    donation_id: str