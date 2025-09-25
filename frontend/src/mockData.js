export const mockData = {
  church: {
    name: "Iglesia Bautista Yaguita de Pastor",
    location: "Santiago, République Dominicaine",
    address: "Avenida Nunez de Carcerez #9, Santiago RD",
    founded: "2011",
    years: "14",
    pastor: {
      name: "Pasteur Smith Dumont",
      phone: "+1 (829) 295-5254",
      email: "ibautistayaguitadelpastor@gmail.com",
      alternateEmail: "Smithdumont_3@hotmail.com"
    }
  },

  services: [
    {
      id: 1,
      name: "Culte du Dimanche Matin",
      time: "07:00 - 10:00 AM / 11:00 AM - 12:00 PM",
      day: "Dimanche",
      description: "Service principal avec prédication et louange"
    },
    {
      id: 2,
      name: "École du Dimanche",
      time: "10:00 - 11:00 AM",
      day: "Dimanche", 
      description: "Étude biblique pour tous les âges"
    },
    {
      id: 3,
      name: "Culte du Mardi",
      time: "19:00 - 21:00 PM",
      day: "Mardi",
      description: "Service de prière et louange"
    },
    {
      id: 4,
      name: "Étude Biblique Vendredi",
      time: "19:00 - 21:00 PM",
      day: "Vendredi",
      description: "Étude approfondie de la Bible"
    }
  ],

  members: {
    total: 500,
    registered: 342,
    active: 287
  },

  feproba: {
    name: "FEPROBA",
    fullName: "Fondation Éducative et Professionnelle Baptiste",
    founded: "2018",
    rnc: "430-330094",
    mission: "Promouvoir l'éducation intégrale et la formation professionnelle des enfants, des jeunes et des adultes issus des communautés défavorisées",
    programs: [
      "École classique pour les enfants marginalisés",
      "Formation professionnelle et manuelle pour les jeunes sans emploi",
      "Développement communautaire à travers des projets éducatifs durables"
    ],
    disciplines: [
      {
        id: 1,
        name: "École Classique",
        description: "Éducation primaire et secondaire pour enfants",
        level: "Primaire et Secondaire",
        duration: "Année scolaire complète",
        age: "6-18 ans"
      },
      {
        id: 2,
        name: "Informatique",
        description: "Formation en bureautique et programmation de base",
        level: "Débutant à Intermédiaire",
        duration: "6 mois",
        age: "16+ ans"
      },
      {
        id: 3,
        name: "Couture",
        description: "Apprentissage des techniques de couture et confection",
        level: "Débutant à Avancé",
        duration: "4 mois",
        age: "14+ ans"
      },
      {
        id: 4,
        name: "Mécanique",
        description: "Mécanique automobile et réparation",
        level: "Débutant à Professionnel",
        duration: "8 mois",
        age: "18+ ans"
      },
      {
        id: 5,
        name: "Cuisine",
        description: "Arts culinaires et gestion de restaurant",
        level: "Débutant à Professionnel",
        duration: "5 mois",
        age: "16+ ans"
      },
      {
        id: 6,
        name: "Décoration",
        description: "Décoration d'intérieur et événements",
        level: "Débutant à Avancé",
        duration: "4 mois",
        age: "16+ ans"
      },
      {
        id: 7,
        name: "Anglais",
        description: "Cours de langue anglaise tous niveaux",
        level: "Débutant à Avancé",
        duration: "6 mois",
        age: "12+ ans"
      },
      {
        id: 8,
        name: "Espagnol",
        description: "Cours de langue espagnole",
        level: "Débutant à Avancé",
        duration: "6 mois",
        age: "12+ ans"
      }
    ]
  },

  isl: {
    name: "ISL",
    fullName: "Instituto de Seminario y Liderazgo",
    founded: "2019",
    partnership: "Louisiana Baptist University (LBU – USA)",
    program: "Programme de diplôme en théologie sur 3 ans",
    students: 200,
    graduates: 120,
    courses: [
      {
        id: 1,
        name: "Théologie Systématique",
        level: "Niveau 1",
        duration: "1 semestre",
        description: "Étude des doctrines fondamentales de la foi chrétienne"
      },
      {
        id: 2,
        name: "Herméneutique",
        level: "Niveau 1",
        duration: "1 semestre",
        description: "Principes d'interprétation biblique"
      },
      {
        id: 3,
        name: "Histoire de l'Église",
        level: "Niveau 2",
        duration: "1 semestre",
        description: "Évolution du christianisme à travers les âges"
      },
      {
        id: 4,
        name: "Administration de l'Église",
        level: "Niveau 2",
        duration: "1 semestre",
        description: "Gestion et leadership ecclésiastique"
      },
      {
        id: 5,
        name: "Leadership Chrétien",
        level: "Niveau 3",
        duration: "1 semestre",
        description: "Développement des compétences de leadership spirituel"
      }
    ]
  },

  events: [
    {
      id: 1,
      title: "Conférence Annuelle",
      date: "2025-03-15",
      time: "18:00",
      description: "Grande conférence spirituelle avec invités spéciaux",
      location: "Sanctuaire principal"
    },
    {
      id: 2,
      title: "Formation FEPROBA",
      date: "2025-02-20",
      time: "14:00",
      description: "Session de formation professionnelle pour jeunes",
      location: "Centre FEPROBA"
    },
    {
      id: 3,
      title: "Graduation ISL",
      date: "2025-05-10",
      time: "16:00",
      description: "Cérémonie de graduation des étudiants en théologie",
      location: "Auditorium ISL"
    }
  ],

  ministries: [
    {
      id: 1,
      name: "Ministère des Jeunes - JSCLM",
      fullName: "Jeune Soldat de Christ Lumière du Monde",
      leader: "Pasteur Ignace Firmin",
      description: "Formation spirituelle et activités pour la jeunesse",
      activities: ["Camps d'été", "Études bibliques", "Sports", "Événements sociaux"],
      mission: "Former des jeunes leaders spirituels forts dans la foi",
      contact: "ignace.firmin@email.com"
    },
    {
      id: 2,
      name: "Ministère d'Évangélisation",
      leader: "Frère Luckson Joseph",
      description: "Partage de l'Évangile dans la communauté",
      activities: ["Visites", "Crusades", "Distribution", "Témoignages"],
      mission: "Répandre la bonne nouvelle du salut en Christ",
      contact: "luckson.joseph@email.com"
    },
    {
      id: 3,
      name: "Ministère de la Musique",
      leader: "Frère Renald Dorsainvil",
      description: "Louange et adoration dans les services",
      activities: ["Chorale", "Orchestre", "Formation musicale", "Concerts"],
      mission: "Conduire l'assemblée dans l'adoration par la musique",
      contact: "renald.dorsainvil@email.com"
    },
    {
      id: 4,
      name: "Ministère des Enfants",
      leader: "Pasteur Ignace Firmin",
      description: "Éducation spirituelle des plus petits",
      activities: ["École du dimanche enfants", "Jeux éducatifs", "Spectacles", "Camps"],
      mission: "Éduquer les enfants dans la foi chrétienne",
      contact: "ignace.firmin@email.com"
    },
    {
      id: 5,
      name: "Ministère des Hommes",
      leader: "Pasteur Dumond Gesner",
      description: "Développement spirituel et fraternel des hommes",
      activities: ["Retraites", "Études bibliques", "Projets communautaires", "Mentorat"],
      mission: "Former des hommes de foi, leaders dans leurs familles",
      contact: "dumond.gesner@email.com"
    }
  ],

  leadership: [
    {
      id: 1,
      name: "Pasteur Smith Dumont",
      position: "Pasteur Principal",
      phone: "+1 (829) 295-5254",
      email: "ibautistayaguitadelpastor@gmail.com",
      bio: "Serviteur dévoué depuis 2011, guide spirituel de notre communauté"
    },
    {
      id: 2,
      name: "Pasteur Ignace Firmin",
      position: "Pasteur Associé - Jeunes et Enfants",
      email: "ignace.firmin@email.com",
      bio: "Responsable des ministères jeunesse et enfance"
    },
    {
      id: 3,
      name: "Pasteur Dumond Gesner",
      position: "Pasteur Associé - Ministère Hommes",
      email: "dumond.gesner@email.com",
      bio: "Leader du ministère des hommes et mentorat"
    },
    {
      id: 4,
      name: "Frère Luckson Joseph",
      position: "Responsable Évangélisation",
      email: "luckson.joseph@email.com",
      bio: "Coordonnateur des activités d'évangélisation"
    },
    {
      id: 5,
      name: "Frère Renald Dorsainvil",
      position: "Directeur Musical",
      email: "renald.dorsainvil@email.com",
      bio: "Responsable de la musique et de la louange"
    }
  ],

  socialMedia: {
    facebook: "https://facebook.com/iglesiabautistayaguita",
    instagram: "https://instagram.com/iglesiabautistayaguita",
    youtube: "https://youtube.com/@iglesiabautistayaguita"
  },

  sermons: [
    {
      id: 1,
      title: "La Grâce Transformatrice",
      date: "2025-01-19",
      speaker: "Pasteur Smith Dumont",
      verse: "Éphésiens 2:8-9",
      audioUrl: "#"
    },
    {
      id: 2,
      title: "Marcher dans la Lumière",
      date: "2025-01-12",
      speaker: "Pasteur Smith Dumont",
      verse: "1 Jean 1:7",
      audioUrl: "#"
    },
    {
      id: 3,
      title: "L'Amour du Prochain",
      date: "2025-01-05",
      speaker: "Pasteur Ignace Firmin",
      verse: "Marc 12:31",
      audioUrl: "#"
    }
  ],

  gallery: [
    {
      id: 1,
      title: "École Classique FEPROBA",
      category: "services",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/3wrg7d46_WhatsApp%20Image%202025-05-12%20%C3%A0%2015.40.06_b72847db.jpg"
    },
    {
      id: 2,
      title: "Formation Informatique",
      category: "facilities",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/493hz1iz_image.png"
    },
    {
      id: 3,
      title: "Activités Éducatives",
      category: "services",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/1z5lrt8l_WhatsApp%20Image%202025-05-12%20%C3%A0%2015.41.04_be04c3c6.jpg"
    },
    {
      id: 4,
      title: "Bâtiment Moderne FEPROBA",
      category: "facilities",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/2eup2z96_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg"
    },
    {
      id: 5,
      title: "Programme Alimentaire",
      category: "services",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/5omceiiz_WhatsApp%20Image%202025-05-21%20%C3%A0%2012.32.51_c2b1885a.jpg"
    },
    {
      id: 6,
      title: "Leadership de l'Église",
      category: "leadership",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/kq7blv0c_Flyer%20Nouvel%20An%20Ouverture%20Restaurant%20Festif.jpg"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Maria Rodriguez",
      text: "Cette église a transformé ma vie. L'amour et le soutien de la communauté sont exceptionnels.",
      role: "Membre fidèle"
    },
    {
      id: 2,
      name: "Juan Carlos",
      text: "Grâce à FEPROBA, j'ai pu acquérir des compétences qui ont changé mon avenir professionnel.",
      role: "Bénéficiaire FEPROBA"
    },
    {
      id: 3,
      name: "Carmen Santos",
      text: "L'Institut ISL m'a préparé spirituellement pour servir dans le ministère avec excellence.",
      role: "Diplômée ISL"
    }
  ]
};