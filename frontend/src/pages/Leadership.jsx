import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Mail, Phone, Users, Star, Award, Heart } from 'lucide-react';
import { mockData } from '../mockData';
import { useNavigate } from 'react-router-dom';

const Leadership = () => {
  const navigate = useNavigate();

  const getRoleIcon = (position) => {
    if (position.includes('Principal')) return Award;
    if (position.includes('Associé')) return Users;
    if (position.includes('Responsable') || position.includes('Directeur')) return Star;
    return Heart;
  };

  const getRoleColor = (position) => {
    if (position.includes('Principal')) return 'blue';
    if (position.includes('Associé')) return 'indigo';
    if (position.includes('Responsable') || position.includes('Directeur')) return 'amber';
    return 'green';
  };

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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Notre Leadership</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Rencontrez l'équipe pastorale et administrative qui guide notre église 
              avec passion et dévouement depuis {mockData.church.years} ans.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.leadership.map((leader) => {
            const IconComponent = getRoleIcon(leader.position);
            const roleColor = getRoleColor(leader.position);
            
            return (
              <Card key={leader.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group">
                {/* Leader Photo */}
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <img 
                    src={leader.id === 1 ? 
                      "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/kq7blv0c_Flyer%20Nouvel%20An%20Ouverture%20Restaurant%20Festif.jpg" :
                      "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/bgvmbe4j_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg"
                    }
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-${roleColor}-600 rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Leader Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                    {leader.name}
                  </h3>
                  
                  <p className={`text-${roleColor}-600 font-medium mb-4`}>
                    {leader.position}
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {leader.bio}
                  </p>
                  
                  {/* Contact Info */}
                  <div className="space-y-3">
                    {leader.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-3 text-blue-600" />
                        <a 
                          href={`mailto:${leader.email}`} 
                          className="text-sm hover:text-blue-600 transition-colors"
                        >
                          {leader.email}
                        </a>
                      </div>
                    )}
                    
                    {leader.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-3 text-blue-600" />
                        <a 
                          href={`tel:${leader.phone}`} 
                          className="text-sm hover:text-blue-600 transition-colors"
                        >
                          {leader.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Church Structure */}
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Structure Organisationnelle</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre église fonctionne avec une structure claire qui favorise 
              la collaboration et l'efficacité dans le service de Dieu.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Direction Pastorale</h3>
              <p className="text-gray-600">Leadership spirituel et vision stratégique de l'église</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Équipe Ministérielle</h3>
              <p className="text-gray-600">Coordination des différents ministères et programmes</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Administration</h3>
              <p className="text-gray-600">Gestion opérationnelle et support aux activités</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs de Leadership</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ces valeurs guident notre équipe dans le service et l'accompagnement de notre communauté.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Amour</h3>
              <p className="text-gray-600 text-sm">Servir avec un cœur rempli d'amour pour Dieu et les autres</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unité</h3>
              <p className="text-gray-600 text-sm">Travailler ensemble dans l'harmonie et la collaboration</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Star className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Donner le meilleur de nous-mêmes dans chaque tâche</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intégrité</h3>
              <p className="text-gray-600 text-sm">Agir avec honnêteté et transparence en tout temps</p>
            </Card>
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="mt-20">
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoindre Notre Équipe</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Vous sentez-vous appelé à servir dans le leadership de l'église ? 
              Découvrez les opportunités de service et de formation disponibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
              >
                <Mail className="w-5 h-5 mr-2" />
                Nous contacter
              </Button>
              <Button 
                onClick={() => navigate('/ministere/1')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 text-lg font-semibold"
              >
                Voir les ministères
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leadership;