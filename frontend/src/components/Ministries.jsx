import React from 'react';
import { Card } from './ui/card';
import { Users, Heart, Music, Globe, ChevronRight } from 'lucide-react';
import { mockData } from '../mockData';

const Ministries = () => {
  const getMinistryIcon = (index) => {
    const icons = [Users, Heart, Globe, Music];
    return icons[index % icons.length];
  };

  return (
    <section id="ministries" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-blue-900">Ministères</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Des ministères variés pour servir Dieu et notre communauté, 
            offrant des opportunités de croissance spirituelle et de service pour tous.
          </p>
        </div>

        {/* Ministries grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {mockData.ministries.map((ministry, index) => {
            const IconComponent = getMinistryIcon(index);
            return (
              <Card key={ministry.id} className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group bg-white">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                      {ministry.name}
                    </h3>
                    
                    <p className="text-sm text-blue-600 mb-3 font-medium">
                      Dirigé par: {ministry.leader}
                    </p>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {ministry.description}
                    </p>
                    
                    {/* Activities */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900">Activités principales:</h4>
                      <div className="flex flex-wrap gap-2">
                        {ministry.activities.map((activity, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Rejoignez un Ministère</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez vos dons et talents au service de Dieu et de la communauté. 
            Chaque membre a sa place dans le corps du Christ.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Communion</h4>
              <p className="text-blue-100 text-sm">Fraternité et soutien mutuel</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Service</h4>
              <p className="text-blue-100 text-sm">Servir avec amour et dévouement</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Mission</h4>
              <p className="text-blue-100 text-sm">Partager l'amour du Christ</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Louange</h4>
              <p className="text-blue-100 text-sm">Adorer Dieu en esprit et en vérité</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ministries;