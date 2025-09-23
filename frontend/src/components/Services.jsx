import React from 'react';
import { Card } from './ui/card';
import { Clock, Calendar, Users, BookOpen } from 'lucide-react';
import { mockData } from '../mockData';

const Services = () => {
  const getServiceIcon = (index) => {
    const icons = [BookOpen, Users, Calendar, Clock];
    return icons[index % icons.length];
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="text-blue-900">Services</span> Religieux
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Rejoignez-nous dans nos moments de culte, de prière et d'étude biblique. 
            Chaque service est une opportunité de grandir dans la foi et la communion fraternelle.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mockData.services.map((service, index) => {
            const IconComponent = getServiceIcon(index);
            return (
              <Card key={service.id} className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group bg-white">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center text-blue-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{service.day}</span>
                  </div>
                  <div className="flex items-center justify-center text-amber-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">{service.time}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Première visite ?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Nous serions ravis de vous accueillir dans notre famille spirituelle. 
            Venez comme vous êtes, Dieu vous attend avec amour.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Accueil Chaleureux</h4>
              <p className="text-blue-100 text-sm">Une équipe dédiée vous accueillera et vous guidera</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Parole Vivante</h4>
              <p className="text-blue-100 text-sm">Des messages bibliques inspirants et pratiques</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Horaires Flexibles</h4>
              <p className="text-blue-100 text-sm">Plusieurs services pour s'adapter à votre emploi du temps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;