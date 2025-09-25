import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Users, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { mockData } from '../mockData';
import { useParams, useNavigate } from 'react-router-dom';

const MinistryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ministry = mockData.ministries.find(m => m.id === parseInt(id));

  if (!ministry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ministère non trouvé</h1>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const getMinistryImage = (ministryId) => {
    // Using different images for different ministries
    const images = {
      1: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/bgvmbe4j_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg",
      2: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/kq7blv0c_Flyer%20Nouvel%20An%20Ouverture%20Restaurant%20Festif.jpg",
      3: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/bgvmbe4j_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg",
      4: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/kq7blv0c_Flyer%20Nouvel%20An%20Ouverture%20Restaurant%20Festif.jpg",
      5: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/bgvmbe4j_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg"
    };
    return images[ministryId] || images[1];
  };

  const getUpcomingEvents = (ministryName) => {
    return [
      {
        id: 1,
        title: `Réunion ${ministryName}`,
        date: "2025-02-15",
        time: "19:00",
        location: "Salle de réunion"
      },
      {
        id: 2,
        title: `Formation ${ministryName}`,
        date: "2025-02-22",
        time: "14:00",
        location: "Auditorium principal"
      },
      {
        id: 3,
        title: `Activité spéciale`,
        date: "2025-03-01",
        time: "16:00",
        location: "Cour de l'église"
      }
    ];
  };

  const events = getUpcomingEvents(ministry.name);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getMinistryImage(ministry.id)}
            alt={ministry.name}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white hover:bg-opacity-20 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {ministry.fullName || ministry.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              {ministry.mission}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">À Propos</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {ministry.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre ministère est dédié à {ministry.mission?.toLowerCase() || 'servir Dieu et la communauté avec excellence'}. 
                Nous croyons que chaque membre a des dons uniques à offrir pour l'édification du corps du Christ 
                et le service de notre communauté locale.
              </p>
            </Card>

            {/* Activities Section */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Activités</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {ministry.activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{activity}</h3>
                      <p className="text-gray-600 text-sm">
                        Activité régulière qui nous permet de grandir ensemble dans notre mission.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Events Section */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Prochains Événements</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-600 pl-6 py-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Leader Info */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Responsable</h3>
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{ministry.leader}</h4>
                <p className="text-blue-600 text-sm mb-4">Responsable du ministère</p>
                {ministry.contact && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">{ministry.contact}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Join Ministry */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rejoignez-nous</h3>
              <p className="text-gray-600 mb-6">
                Vous sentez-vous appelé à servir dans ce ministère ? 
                Contactez-nous pour en savoir plus sur les opportunités de service.
              </p>
              <Button 
                onClick={() => navigate('/contact')}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Mail className="w-4 h-4 mr-2" />
                Nous contacter
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informations</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Membres actifs</span>
                  <span className="font-semibold text-blue-600">25+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Années d'activité</span>
                  <span className="font-semibold text-blue-600">{mockData.church.years}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activités régulières</span>
                  <span className="font-semibold text-blue-600">{ministry.activities.length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistryDetail;