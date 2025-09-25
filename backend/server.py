from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Iglesia Bautista Yaguita de Pastor API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class MessageStatus(str, Enum):
    NEW = "new"
    READ = "read"
    REPLIED = "replied"

class EventCategory(str, Enum):
    CONFERENCE = "conference"
    FORMATION = "formation"
    CELEBRATION = "celebration"
    COMMUNITY = "community"

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    status: MessageStatus = MessageStatus.NEW
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

# Newsletter Models
class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: Optional[str] = None
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = None

# Event Models
class Event(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    date: str  # ISO date string
    time: str
    description: str
    location: str
    category: EventCategory = EventCategory.COMMUNITY
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class EventCreate(BaseModel):
    title: str
    date: str
    time: str
    description: str
    location: str
    category: EventCategory = EventCategory.COMMUNITY

# Member Models
class Member(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    address: Optional[str] = None
    birth_date: Optional[str] = None
    profession: Optional[str] = None
    registration_date: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True

class MemberCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: Optional[str] = None
    birth_date: Optional[str] = None
    profession: Optional[str] = None

# Course Reservation Models
class CourseReservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    course_type: str  # "feproba" or "isl"
    course_name: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: MessageStatus = MessageStatus.NEW

class CourseReservationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    course_type: str
    course_name: str
    message: Optional[str] = None

# Admin Models
class AdminUser(BaseModel):
    username: str
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Church Information
@api_router.get("/church")
async def get_church_info():
    return {
        "name": "Iglesia Bautista Yaguita de Pastor",
        "location": "Santiago, République Dominicaine", 
        "address": "Avenida Nunez de Carcerez #9, Santiago RD",
        "founded": "2011",
        "years": "14",
        "pastor": {
            "name": "Pasteur Smith Dumont",
            "phone": "+1 (829) 295-5254",
            "email": "ibautistayaguitadelpastor@gmail.com",
            "alternateEmail": "Smithdumont_3@hotmail.com"
        }
    }

# Member Routes
@api_router.post("/members/register", response_model=Member)
async def register_member(member: MemberCreate):
    # Check if email already exists
    existing = await db.members.find_one({"email": member.email})
    if existing:
        raise HTTPException(status_code=400, detail="Cette adresse e-mail est déjà enregistrée")
    
    member_dict = member.dict()
    member_obj = Member(**member_dict)
    
    try:
        await db.members.insert_one(member_obj.dict())
        logging.info(f"New member registered: {member_obj.name} ({member_obj.email})")
        return member_obj
    except Exception as e:
        logging.error(f"Error registering member: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'inscription du membre")

@api_router.get("/members/count")
async def get_members_count():
    total = await db.members.count_documents({"active": True})
    return {"total": total, "registered": total}

@api_router.get("/members", response_model=List[Member])
async def get_members():
    """Get all members (admin only)"""
    members = await db.members.find({"active": True}).to_list(1000)
    return [Member(**member) for member in members]

# Course Reservation Routes
@api_router.post("/reservations", response_model=CourseReservation)
async def create_course_reservation(reservation: CourseReservationCreate):
    reservation_dict = reservation.dict()
    reservation_obj = CourseReservation(**reservation_dict)
    
    try:
        await db.course_reservations.insert_one(reservation_obj.dict())
        logging.info(f"New course reservation: {reservation_obj.name} for {reservation_obj.course_name}")
        return reservation_obj
    except Exception as e:
        logging.error(f"Error creating course reservation: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la réservation")

@api_router.get("/reservations", response_model=List[CourseReservation])
async def get_course_reservations():
    """Get all course reservations (admin only)"""
    reservations = await db.course_reservations.find().sort("created_at", -1).to_list(100)
    return [CourseReservation(**reservation) for reservation in reservations]

# Admin Routes
@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    # Simple authentication (in production, use proper hashing)
    if credentials.username == "hamilton" and credentials.password == "Code2022@":
        return {"success": True, "token": "admin-authenticated"}
    else:
        raise HTTPException(status_code=401, detail="Identifiants invalides")

# Contact Routes
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message: ContactMessageCreate):
    contact_dict = message.dict()
    contact_obj = ContactMessage(**contact_dict)
    
    try:
        # Save to database
        await db.contact_messages.insert_one(contact_obj.dict())
        
        # Here you would typically send an email notification
        # For now, we'll just log it
        logging.info(f"New contact message from {contact_obj.name} ({contact_obj.email}): {contact_obj.subject}")
        
        return contact_obj
    except Exception as e:
        logging.error(f"Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'envoi du message")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (for admin use)"""
    messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
    return [ContactMessage(**msg) for msg in messages]

# Newsletter Routes
@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscriber)
async def subscribe_newsletter(subscription: NewsletterSubscribe):
    # Check if email already exists
    existing = await db.newsletter_subscribers.find_one({"email": subscription.email})
    if existing:
        raise HTTPException(status_code=400, detail="Cette adresse e-mail est déjà inscrite à notre newsletter")
    
    subscriber_dict = subscription.dict()
    subscriber_obj = NewsletterSubscriber(**subscriber_dict)
    
    try:
        await db.newsletter_subscribers.insert_one(subscriber_obj.dict())
        logging.info(f"New newsletter subscription: {subscriber_obj.email}")
        return subscriber_obj
    except Exception as e:
        logging.error(f"Error saving newsletter subscription: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'inscription à la newsletter")

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscriber])
async def get_newsletter_subscribers():
    """Get all newsletter subscribers (for admin use)"""
    subscribers = await db.newsletter_subscribers.find({"active": True}).to_list(1000)
    return [NewsletterSubscriber(**sub) for sub in subscribers]

# Events Routes
@api_router.get("/events", response_model=List[Event])
async def get_events():
    """Get upcoming events"""
    events = await db.events.find().sort("date", 1).to_list(50)
    return [Event(**event) for event in events]

@api_router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    """Create a new event (admin use)"""
    event_dict = event.dict()
    event_obj = Event(**event_dict)
    
    try:
        await db.events.insert_one(event_obj.dict())
        logging.info(f"New event created: {event_obj.title} on {event_obj.date}")
        return event_obj
    except Exception as e:
        logging.error(f"Error creating event: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création de l'événement")

@api_router.get("/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    """Get specific event by ID"""
    event = await db.events.find_one({"id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Événement non trouvé")
    return Event(**event)

# Services Routes (static data for now)
@api_router.get("/services")
async def get_services():
    """Get church services schedule"""
    services = [
        {
            "id": 1,
            "name": "Culte du Dimanche Matin",
            "time": "07:00 - 10:00 AM / 11:00 AM - 12:00 PM",
            "day": "Dimanche",
            "description": "Service principal avec prédication et louange"
        },
        {
            "id": 2,
            "name": "École du Dimanche",
            "time": "10:00 - 11:00 AM",
            "day": "Dimanche", 
            "description": "Étude biblique pour tous les âges"
        },
        {
            "id": 3,
            "name": "Culte du Mardi",
            "time": "19:00 - 21:00 PM",
            "day": "Mardi",
            "description": "Service de prière et louange"
        },
        {
            "id": 4,
            "name": "Étude Biblique Vendredi",
            "time": "19:00 - 21:00 PM",
            "day": "Vendredi",
            "description": "Étude approfondie de la Bible"
        }
    ]
    return services

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
