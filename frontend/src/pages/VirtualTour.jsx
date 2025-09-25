import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Building, Users, Music, BookOpen, Heart, Play, Camera, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VirtualTour = () => {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState(null);

  const areas = [
    {
      id: 1,
      name: "Sanctuaire Principal",
      description: "Notre magnifique sanctuaire peut accueillir 500 personnes pour les services de culte. Équipé d'un système audio moderne et d'un éclairage professionnel.",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/bgvmbe4j_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg",
      icon: Building,
      capacity: "500 places",
      features: ["Système audio professionnel", "Éclairage LED", "Climatisation", "Accès handicapé"],
      activities: ["Cultes du dimanche", "Conférences", "Mariages", "Cérémonies spéciales"]
    },
    {
      id: 2,
      name: "Salles de Formation FEPROBA",
      description: "Espaces modernes dédiés à la formation professionnelle avec équipements spécialisés pour chaque discipline enseignée. Nos élèves bénéficient d'un environnement d'apprentissage optimal.",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/493hz1iz_image.png",
      icon: BookOpen,
      capacity: "25-30 étudiants par salle",
      features: ["Équipements informatiques", "Ateliers techniques", "Laboratoires", "Bibliothèque"],
      activities: ["Formation informatique", "École classique", "Ateliers pratiques", "Cours de langues"]
    },
    {
      id: 3,
      name: "École Classique FEPROBA",
      description: "Programme d'éducation primaire et secondaire pour enfants avec uniformes distinctifs. Un environnement éducatif structuré favorisant l'excellence académique et les valeurs chrétiennes.",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/3wrg7d46_WhatsApp%20Image%202025-05-12%20%C3%A0%2015.40.06_b72847db.jpg",
      icon: Users,
      capacity: "200 élèves",
      features: ["Uniformes scolaires", "Encadrement personnalisé", "Activités parascolaires", "Soutien nutritionnel"],
      activities: ["Cours académiques", "Activités sportives", "Formation caractère", "Événements éducatifs"]
    },
    {
      id: 4,
      name: "Programme Alimentaire",
      description: "Service de restauration et programme nutritionnel pour les étudiants. Nous veillons à ce que tous nos élèves reçoivent une alimentation équilibrée pendant leur formation.",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/5omceiiz_WhatsApp%20Image%202025-05-21%20%C3%A0%2012.32.51_c2b1885a.jpg",
      icon: Heart,
      capacity: "300 repas/jour",
      features: ["Cuisine moderne", "Menus équilibrés", "Hygiène stricte", "Éducation nutritionnelle"],
      activities: ["Repas quotidiens", "Éducation nutrition", "Jardinage", "Cours de cuisine"]
    },
    {
      id: 5,
      name: "Activités Éducatives Diverses",
      description: "Espaces polyvalents pour diverses activités éducatives et récréatives. Nos programmes favorisent le développement intégral de chaque enfant dans un cadre bienveillant.",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/1z5lrt8l_WhatsApp%20Image%202025-05-12%20%C3%A0%2015.41.04_be04c3c6.jpg",
      icon: Users,
      capacity: "50 enfants par activité",
      features: ["Espaces modulables", "Matériel éducatif", "Encadrement qualifié", "Sécurité optimale"],
      activities: ["Jeux éducatifs", "Arts créatifs", "Sciences amusantes", "Développement social"]
    },
    {
      id: 6,
      name: "Bureaux Administratifs",
      description: "Espaces de travail pour l'équipe pastorale et administrative avec salles de conseil et de réception.",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/kq7blv0c_Flyer%20Nouvel%20An%20Ouverture%20Restaurant%20Festif.jpg",
      icon: Building,
      capacity: "Équipe de 10 personnes",
      features: ["Bureaux individuels", "Salle de réunion", "Réception", "Archives"],
      activities: ["Conseil pastoral", "Administration", "Réceptions", "Réunions équipe"]
    }
  ];

  const AreaModal = ({ area, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={area.image} 
            alt={area.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
          >
            ✕
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex items-center mb-4">
            <area.icon className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">{area.name}</h3>
          </div>
          
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {area.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Caractéristiques</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Capacité: {area.capacity}</span>
                </div>
                {area.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Activités</h4>
              <div className="space-y-2">
                {area.activities.map((activity, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Camera className="w-4 h-4 mr-2" />
              Voir plus de photos
            </Button>
            <Button variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              Localisation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white hover:bg-opacity-20 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Visite Virtuelle</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez nos installations modernes et nos espaces dédiés au culte, 
              à l'éducation et à la communion fraternelle.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explorez Nos Espaces</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cliquez sur chaque zone pour découvrir en détail nos installations et leurs fonctionnalités.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <Card 
              key={area.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-gray-100 hover:border-blue-200"
              onClick={() => setSelectedArea(area)}
            >
              <div className="relative">
                <img 
                  src={area.image} 
                  alt={area.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <area.icon className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
                    {area.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {area.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{area.capacity}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                    Explorer →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Installations en Chiffres</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500</div>
              <p className="text-gray-600">Places dans le sanctuaire</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
              <p className="text-gray-600">Salles de formation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3</div>
              <p className="text-gray-600">Institutions hébergées</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2000m²</div>
              <p className="text-gray-600">Surface totale</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h2 className="text-3xl font-bold mb-4">Visitez-nous en personne !</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rien ne remplace une visite réelle. Venez découvrir notre communauté 
              chaleureuse et nos installations modernes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Planifier une visite
              </Button>
              <Button 
                onClick={() => navigate('/#services')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 text-lg font-semibold"
              >
                Voir les horaires
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Area Detail Modal */}
      {selectedArea && (
        <AreaModal 
          area={selectedArea} 
          onClose={() => setSelectedArea(null)} 
        />
      )}
    </div>
  );
};

export default VirtualTour;