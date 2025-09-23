"""
Script d'initialisation des données de base pour l'église
"""
import asyncio
import os
from dotenv import load_dotenv
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import uuid

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

async def init_events():
    """Initialize default events"""
    events = [
        {
            "id": str(uuid.uuid4()),
            "title": "Conférence Annuelle 2025",
            "date": "2025-03-15",
            "time": "18:00",
            "description": "Grande conférence spirituelle avec invités spéciaux internationaux. Un moment privilégié de communion et d'édification mutuelle.",
            "location": "Sanctuaire principal",
            "category": "conference",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Formation Professionnelle FEPROBA",
            "date": "2025-02-20",
            "time": "14:00",
            "description": "Session de formation professionnelle pour jeunes et adultes. Développement de compétences pratiques et spirituelles.",
            "location": "Centre FEPROBA",
            "category": "formation",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Graduation ISL 2025",
            "date": "2025-05-10",
            "time": "16:00",
            "description": "Cérémonie de graduation des étudiants en théologie de l'Institut de Séminaire et Leadership.",
            "location": "Auditorium ISL",
            "category": "celebration",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Journée Communautaire",
            "date": "2025-04-05",
            "time": "10:00",
            "description": "Événement communautaire avec activités pour toute la famille, repas partagé et témoignages inspirants.",
            "location": "Cour de l'église",
            "category": "community",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Clear existing events and insert new ones
    await db.events.delete_many({})
    await db.events.insert_many(events)
    print(f"✅ {len(events)} événements initialisés")

async def init_testimonials():
    """Initialize testimonials"""
    testimonials = [
        {
            "id": str(uuid.uuid4()),
            "name": "Maria Rodriguez",
            "text": "Cette église a transformé ma vie. L'amour et le soutien de la communauté sont exceptionnels. Je recommande vivement à tous ceux qui cherchent un foyer spirituel.",
            "role": "Membre fidèle",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Juan Carlos Herrera",
            "text": "Grâce à FEPROBA, j'ai pu acquérir des compétences qui ont changé mon avenir professionnel. Cette fondation fait vraiment une différence dans notre communauté.",
            "role": "Bénéficiaire FEPROBA",
            "created_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Carmen Santos",
            "text": "L'Institut ISL m'a préparé spirituellement et académiquement pour servir dans le ministère avec excellence. Une formation de haute qualité.",
            "role": "Diplômée ISL",
            "created_at": datetime.utcnow()
        }
    ]
    
    await db.testimonials.delete_many({})
    await db.testimonials.insert_many(testimonials)
    print(f"✅ {len(testimonials)} témoignages initialisés")

async def init_all_data():
    """Initialize all default data"""
    print("🚀 Initialisation des données de base...")
    await init_events()
    await init_testimonials()
    print("✅ Initialisation terminée avec succès!")

if __name__ == "__main__":
    asyncio.run(init_all_data())