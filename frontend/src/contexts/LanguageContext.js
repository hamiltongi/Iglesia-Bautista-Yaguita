import React, { createContext, useContext, useState, useEffect } from 'react';

// Traductions
const translations = {
  fr: {
    // Navigation
    accueil: "Accueil",
    apropos: "À Propos",
    services: "Services", 
    feproba: "FEPROBA",
    isl: "ISL",
    ministeres: "Ministères",
    evenements: "Événements",
    galerie: "Galerie",
    contact: "Contact",
    connexion: "Connexion",
    inscription: "Inscription",
    portailMembre: "Portail Membre",
    deconnexion: "Déconnexion",
    faireDon: "Faire un Don",

    // Hero Section
    bienvenue: "Bienvenue à l'Iglesia Bautista Yaguita de Pastor",
    messageAccueil: "Une communauté de foi, d'espoir et d'amour dans le service de Dieu",
    rejoindreNous: "Rejoignez-nous",
    enSavoirPlus: "En savoir plus",

    // About Section
    aproposTitle: "À Propos de Notre Église",
    aproposMessage: "L'Iglesia Bautista Yaguita de Pastor est une église dédiée au service de Dieu et de notre communauté. Nous sommes engagés dans l'enseignement de la Parole de Dieu, l'édification des croyants et l'évangélisation.",
    notreVision: "Notre Vision",
    notreVisionText: "Être une église qui transforme la vie des gens par l'amour du Christ",
    notreMission: "Notre Mission", 
    notreMissionText: "Prêcher l'Évangile, former des disciples et servir notre communauté",

    // Services
    servicesTitle: "Nos Services",
    servicesDescription: "Rejoignez-nous pour nos services de culte et d'étude biblique",
    
    // Contact
    contactTitle: "Contactez-nous",
    contactDescription: "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message !",
    nom: "Nom",
    prenom: "Prénom",
    email: "Email",
    telephone: "Téléphone",
    sujet: "Sujet",
    message: "Message",
    envoyer: "Envoyer",
    envoi: "Envoi...",

    // Auth
    motDePasse: "Mot de passe",
    confirmerMotDePasse: "Confirmer le mot de passe",
    nomUtilisateur: "Nom d'utilisateur",
    seConnecter: "Se connecter",
    sInscrire: "S'inscrire",
    dejaUnCompte: "Déjà un compte ?",
    pasDeCompte: "Pas encore de compte ?",

    // Nouveaux champs d'inscription
    niveauEtudeClassique: "Niveau d'étude classique",
    niveauProfessionnel: "Niveau professionnel",
    cinNifPassport: "CIN/NIF/Passport",
    statutMatrimonial: "Statut matrimonial",
    qteEnfants: "Quantité d'enfants",
    convertiStatus: "Converti/Baptisé/Chute/En formation",
    donMinisteriel: "Vos dons ministériels",

    // Footer
    droitsReserves: "Tous droits réservés",
    suivezNous: "Suivez-nous",

    // Erreurs/Messages
    erreurReseau: "Erreur réseau. Veuillez réessayer.",
    inscriptionReussie: "Inscription réussie ! Merci de rejoindre notre communauté.",
    messageEnvoye: "Message envoyé avec succès !",
    erreurFormulaire: "Veuillez remplir tous les champs requis",
  },

  en: {
    // Navigation
    accueil: "Home",
    apropos: "About",
    services: "Services",
    feproba: "FEPROBA", 
    isl: "ISL",
    ministeres: "Ministries",
    evenements: "Events",
    galerie: "Gallery",
    contact: "Contact",
    connexion: "Login",
    inscription: "Register", 
    portailMembre: "Member Portal",
    deconnexion: "Logout",
    faireDon: "Donate",

    // Hero Section
    bienvenue: "Welcome to Iglesia Bautista Yaguita de Pastor",
    messageAccueil: "A community of faith, hope and love in service to God",
    rejoindreNous: "Join Us",
    enSavoirPlus: "Learn More",

    // About Section
    aproposTitle: "About Our Church",
    aproposMessage: "Iglesia Bautista Yaguita de Pastor is a church dedicated to serving God and our community. We are committed to teaching God's Word, edifying believers and evangelization.",
    notreVision: "Our Vision",
    notreVisionText: "To be a church that transforms people's lives through Christ's love",
    notreMission: "Our Mission",
    notreMissionText: "Preach the Gospel, make disciples and serve our community",

    // Services
    servicesTitle: "Our Services",
    servicesDescription: "Join us for our worship and bible study services",

    // Contact
    contactTitle: "Contact Us",
    contactDescription: "We would love to hear from you. Send us a message!",
    nom: "Last Name",
    prenom: "First Name", 
    email: "Email",
    telephone: "Phone",
    sujet: "Subject",
    message: "Message",
    envoyer: "Send",
    envoi: "Sending...",

    // Auth
    motDePasse: "Password",
    confirmerMotDePasse: "Confirm Password",
    nomUtilisateur: "Username",
    seConnecter: "Login",
    sInscrire: "Register",
    dejaUnCompte: "Already have an account?",
    pasDeCompte: "Don't have an account yet?",

    // Nouveaux champs d'inscription
    niveauEtudeClassique: "Classical Education Level",
    niveauProfessionnel: "Professional Level",
    cinNifPassport: "ID/NIF/Passport",
    statutMatrimonial: "Marital Status",
    qteEnfants: "Number of Children", 
    convertiStatus: "Converted/Baptized/Fallen/In Training",
    donMinisteriel: "Your Ministerial Gifts",

    // Footer
    droitsReserves: "All rights reserved",
    suivezNous: "Follow us",

    // Erreurs/Messages
    erreurReseau: "Network error. Please try again.",
    inscriptionReussie: "Registration successful! Thank you for joining our community.",
    messageEnvoye: "Message sent successfully!",
    erreurFormulaire: "Please fill in all required fields",
  },

  es: {
    // Navigation  
    accueil: "Inicio",
    apropos: "Acerca de",
    services: "Servicios",
    feproba: "FEPROBA",
    isl: "ISL", 
    ministeres: "Ministerios",
    evenements: "Eventos",
    galerie: "Galería",
    contact: "Contacto",
    connexion: "Iniciar Sesión",
    inscription: "Registrarse",
    portailMembre: "Portal de Miembros", 
    deconnexion: "Cerrar Sesión",
    faireDon: "Donar",

    // Hero Section
    bienvenue: "Bienvenidos a la Iglesia Bautista Yaguita de Pastor",
    messageAccueil: "Una comunidad de fe, esperanza y amor al servicio de Dios",
    rejoindreNous: "Únete a Nosotros",
    enSavoirPlus: "Saber Más",

    // About Section
    aproposTitle: "Acerca de Nuestra Iglesia",
    aproposMessage: "La Iglesia Bautista Yaguita de Pastor es una iglesia dedicada a servir a Dios y a nuestra comunidad. Estamos comprometidos con la enseñanza de la Palabra de Dios, la edificación de los creyentes y la evangelización.",
    notreVision: "Nuestra Visión",
    notreVisionText: "Ser una iglesia que transforme vidas a través del amor de Cristo",
    notreMission: "Nuestra Misión",
    notreMissionText: "Predicar el Evangelio, hacer discípulos y servir a nuestra comunidad",

    // Services
    servicesTitle: "Nuestros Servicios",
    servicesDescription: "Únete a nosotros en nuestros servicios de adoración y estudio bíblico",

    // Contact
    contactTitle: "Contáctanos",
    contactDescription: "Nos encantaría saber de ti. ¡Envíanos un mensaje!",
    nom: "Apellido",
    prenom: "Nombre",
    email: "Correo Electrónico",
    telephone: "Teléfono", 
    sujet: "Asunto",
    message: "Mensaje",
    envoyer: "Enviar",
    envoi: "Enviando...",

    // Auth
    motDePasse: "Contraseña",
    confirmerMotDePasse: "Confirmar Contraseña", 
    nomUtilisateur: "Nombre de Usuario",
    seConnecter: "Iniciar Sesión",
    sInscrire: "Registrarse",
    dejaUnCompte: "¿Ya tienes una cuenta?",
    pasDeCompte: "¿Aún no tienes cuenta?",

    // Nouveaux champs d'inscription
    niveauEtudeClassique: "Nivel de Estudios Clásicos",
    niveauProfessionnel: "Nivel Profesional",
    cinNifPassport: "Cédula/NIF/Pasaporte", 
    statutMatrimonial: "Estado Civil",
    qteEnfants: "Cantidad de Hijos",
    convertiStatus: "Convertido/Bautizado/Caído/En Formación",
    donMinisteriel: "Sus Dones Ministeriales",

    // Footer
    droitsReserves: "Todos los derechos reservados",
    suivezNous: "Síguenos",

    // Erreurs/Messages
    erreurReseau: "Error de red. Por favor, inténtelo de nuevo.",
    inscriptionReussie: "¡Registro exitoso! Gracias por unirte a nuestra comunidad.",
    messageEnvoye: "¡Mensaje enviado exitosamente!",
    erreurFormulaire: "Por favor complete todos los campos requeridos",
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Récupérer la langue sauvegardée ou utiliser français par défaut
    return localStorage.getItem('language') || 'fr';
  });

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    // Sauvegarder la langue dans localStorage quand elle change
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    changeLanguage,
    t,
    languages: {
      fr: 'Français',
      en: 'English', 
      es: 'Español'
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};