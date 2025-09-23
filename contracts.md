# Contrats API et Intégration Backend - Iglesia Bautista Yaguita de Pastor

## Vue d'ensemble
Ce document définit les contrats API et la stratégie d'intégration entre le frontend React et le backend FastAPI pour le site web de l'église.

## Données Mockées Actuelles (mockData.js)
### Structures de données utilisées dans le frontend:
- **church**: Informations générales de l'église et du pasteur
- **services**: Horaires des services religieux (4 services)
- **feproba**: Informations sur la fondation éducative
- **isl**: Détails du séminaire biblique
- **events**: Événements à venir (3 événements)
- **ministries**: Ministères de l'église (4 ministères)
- **sermons**: Prédications récentes (3 sermons)
- **gallery**: Images de la galerie (3 catégories)
- **testimonials**: Témoignages des membres (3 témoignages)

## Contrats API à implémenter

### 1. API Church Information
**GET /api/church**
- Retourne les informations de base de l'église
- Pas de données dynamiques nécessaires pour l'instant

### 2. API Services
**GET /api/services**
- Retourne la liste des services religieux avec horaires
- Données statiques pour le moment

### 3. API Events
**GET /api/events**
- Retourne les événements à venir
- **POST /api/events** (pour administration future)

**Modèle Event:**
```
{
  id: string,
  title: string,
  date: string (ISO),
  time: string,
  description: string,
  location: string,
  created_at: datetime,
  updated_at: datetime
}
```

### 4. API Contact
**POST /api/contact**
- Traite les messages du formulaire de contact
- Envoie des notifications email
- Stockage des messages pour suivi

**Modèle ContactMessage:**
```
{
  id: string,
  name: string,
  email: string,
  phone: string (optionnel),
  subject: string,
  message: string,
  status: string (new, read, replied),
  created_at: datetime
}
```

### 5. API Newsletter
**POST /api/newsletter/subscribe**
- Inscription à la newsletter
- Validation email

**Modèle NewsletterSubscriber:**
```
{
  id: string,
  email: string,
  name: string (optionnel),
  subscribed_at: datetime,
  active: boolean
}
```

### 6. API Sermons
**GET /api/sermons**
- Retourne la liste des prédications
- **POST /api/sermons** (pour administration)

**Modèle Sermon:**
```
{
  id: string,
  title: string,
  date: string,
  speaker: string,
  verse: string,
  audio_url: string (optionnel),
  transcript: string (optionnel),
  created_at: datetime
}
```

### 7. API Gallery
**GET /api/gallery**
- Retourne les images avec filtres par catégorie
- **POST /api/gallery** (upload d'images)

**Modèle GalleryImage:**
```
{
  id: string,
  title: string,
  category: string,
  image_url: string,
  thumbnail_url: string,
  uploaded_at: datetime
}
```

## Priorités d'implémentation

### Phase 1 (Essentiel)
1. **Contact API** - Formulaire de contact fonctionnel
2. **Newsletter API** - Inscription newsletter
3. **Events API** - Gestion des événements

### Phase 2 (Améliorations)
1. **Sermons API** - Gestion des prédications
2. **Gallery API** - Upload et gestion d'images
3. **Admin Panel** - Interface d'administration

## Intégration Frontend-Backend

### Remplacer les données mockées:
1. **Services.jsx** - Remplacer `mockData.services` par appel API
2. **Events.jsx** - Remplacer `mockData.events` + ajouter formulaire d'inscription
3. **Contact.jsx** - Connecter le formulaire au backend
4. **Gallery.jsx** - Remplacer `mockData.gallery` par appel API
5. **Header.jsx** et **Footer.jsx** - Utiliser les données de church API

### Variables d'environnement nécessaires:
- **SMTP_SERVER** - Pour l'envoi d'emails
- **SMTP_USERNAME** et **SMTP_PASSWORD**
- **ADMIN_EMAIL** - Email de réception des messages
- **JWT_SECRET** - Pour l'authentification admin future

### Gestion d'erreurs:
- Messages d'erreur en français
- Fallback sur données mockées en cas d'échec API
- Loading states pour toutes les requêtes

### Points d'attention:
1. **Validation des données** côté backend et frontend
2. **Sécurité** - Validation des inputs, rate limiting
3. **Performance** - Mise en cache des données statiques
4. **Responsivité** - Gestion des états de chargement
5. **Internationalisation** - Tout en français

## Tests à effectuer après intégration:
1. Soumission du formulaire de contact
2. Inscription à la newsletter
3. Affichage des événements dynamiques
4. Upload d'images dans la galerie
5. Navigation et performance générale