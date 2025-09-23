export const mockData = {
  church: {
    name: "Iglesia Bautista Yaguita de Pastor",
    location: "Santiago, République Dominicaine",
    address: "Avenida Nunez de Carcerez #9, Santiago RD",
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
      time: "09:00 AM",
      day: "Dimanche",
      description: "Service principal avec prédication et louange"
    },
    {
      id: 2,
      name: "École du Dimanche",
      time: "08:00 AM",
      day: "Dimanche", 
      description: "Étude biblique pour tous les âges"
    },
    {
      id: 3,
      name: "Culte du Mercredi",
      time: "19:00 PM",
      day: "Mercredi",
      description: "Service de prière et étude biblique"
    },
    {
      id: 4,
      name: "Culte des Jeunes",
      time: "18:00 PM",
      day: "Vendredi",
      description: "Service dédié aux jeunes et adolescents"
    }
  ],

  feproba: {
    name: "FEPROBA",
    fullName: "Fondation Éducative et Professionnelle Baptiste",
    founded: "2018",
    rnc: "430-330094",
    mission: "Promouvoir l'éducation intégrale et la formation professionnelle des enfants, des jeunes et des adultes issus des communautés défavorisées",
    programs: [
      "Accès à l'éducation classique pour les enfants marginalisés",
      "Formation professionnelle et manuelle pour les jeunes sans emploi",
      "Développement communautaire à travers des projets éducatifs durables"
    ]
  },

  isl: {
    name: "ISL",
    fullName: "Instituto de Seminario y Liderazgo",
    founded: "2019",
    partnership: "Louisiana Baptist University (LBU – USA)",
    program: "Programme de diplôme en théologie sur 3 ans",
    courses: [
      "Théologie Systématique",
      "Herméneutique", 
      "Histoire de l'Église",
      "Administration de l'Église",
      "Leadership Chrétien"
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
      name: "Ministère des Jeunes",
      leader: "Équipe Pastorale",
      description: "Formation spirituelle et activités pour la jeunesse",
      activities: ["Camps d'été", "Études bibliques", "Sports"]
    },
    {
      id: 2,
      name: "Ministère des Femmes",
      leader: "Sœurs de l'Église",
      description: "Soutien et développement spirituel des femmes",
      activities: ["Cercles d'étude", "Projets sociaux", "Retraites"]
    },
    {
      id: 3,
      name: "Ministère d'Évangélisation",
      leader: "Équipe Missionnaire",
      description: "Partage de l'Évangile dans la communauté",
      activities: ["Visites", "Crusades", "Distribution"]
    },
    {
      id: 4,
      name: "Ministère de la Musique",
      leader: "Directeur Musical",
      description: "Louange et adoration dans les services",
      activities: ["Chorale", "Orchestre", "Formation musicale"]
    }
  ],

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
      speaker: "Pasteur Invité",
      verse: "Marc 12:31",
      audioUrl: "#"
    }
  ],

  gallery: [
    {
      id: 1,
      title: "Culte du Dimanche",
      category: "services",
      image: "https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/locsay3u_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg"
    },
    {
      id: 2,
      title: "Bâtiment de l'Église",
      category: "facilities",
      image: "https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/locsay3u_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg"
    },
    {
      id: 3,
      title: "Pasteur Smith Dumont",
      category: "leadership",
      image: "https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/ggi04ggb_Flyer%20Nouvel%20An%20Ouverture%20Restaurant%20Festif.jpg"
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