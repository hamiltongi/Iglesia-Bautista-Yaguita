import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Image, Users, Building, Heart, Filter } from 'lucide-react';
import { mockData } from '../mockData';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'Tout', icon: Image },
    { id: 'services', name: 'Services', icon: Users },
    { id: 'facilities', name: 'Installations', icon: Building },
    { id: 'leadership', name: 'Leadership', icon: Heart }
  ];

  const filteredGallery = selectedCategory === 'all' 
    ? mockData.gallery 
    : mockData.gallery.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Notre <span className="text-blue-900">Galerie</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez la vie de notre communauté à travers ces images qui racontent 
            notre histoire, nos célébrations et nos moments de communion fraternelle.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Gallery grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredGallery.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Image className="w-4 h-4 mr-2" />
                      Voir plus
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {categories.find(cat => cat.id === item.category)?.name || 'Général'}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Virtual tour section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Visite Virtuelle Complète</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explorez notre église et découvrez nos installations modernes 
            conçues pour accueillir chaleureusement notre communauté.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Sanctuaire Principal</h4>
              <p className="text-blue-100 text-sm">Espace de culte moderne avec 500 places</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Salles de Formation</h4>
              <p className="text-blue-100 text-sm">Espaces dédiés à l'éducation et aux ministères</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Espaces Communautaires</h4>
              <p className="text-blue-100 text-sm">Lieux de fellowship et d'activités sociales</p>
            </div>
          </div>

          <Button 
            onClick={() => navigate('/visite-virtuelle')}
            className="mt-8 bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold transition-all duration-300"
          >
            <Building className="ml-2 h-5 w-5" />
            Commencer la visite virtuelle
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;