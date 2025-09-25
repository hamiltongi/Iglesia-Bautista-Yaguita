import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { GraduationCap, Users, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { mockData } from '../mockData';
import { useNavigate } from 'react-router-dom';

const FEPROBA = () => {
  const navigate = useNavigate();

  return (
    <section id="feproba" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4 mr-2" />
            Fondation Éducative
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-amber-600">FEPROBA</span>
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            Fondation Éducative et Professionnelle Baptiste
          </h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Une institution chrétienne à but non lucratif, fondée en 2018, dédiée à 
            promouvoir l'éducation intégrale et la formation professionnelle des communautés défavorisées.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-sm text-amber-600 font-medium">
                <span>Fondée en {mockData.feproba.founded}</span>
                <span>•</span>
                <span>RNC: {mockData.feproba.rnc}</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900">Notre Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {mockData.feproba.mission}
              </p>
              
              <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-600">
                <h4 className="text-xl font-semibold text-amber-900 mb-3">Vision Transformatrice</h4>
                <p className="text-amber-800 leading-relaxed">
                  "Inspirée par les valeurs bibliques de justice, d'amour du prochain et de transformation 
                  par la connaissance, FEPROBA s'engage à construire un avenir meilleur pour chaque jeune."
                </p>
              </div>
            </div>
          </div>

          {/* Right content - Statistics */}
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">200+</h4>
                <p className="text-gray-600">Bénéficiaires formés</p>
              </div>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center border-amber-200">
                <div className="text-3xl font-bold text-amber-600 mb-2">8+</div>
                <p className="text-sm text-gray-600">Disciplines offertes</p>
              </Card>
              <Card className="p-6 text-center border-amber-200">
                <div className="text-3xl font-bold text-amber-600 mb-2">85%</div>
                <p className="text-sm text-gray-600">Taux de réussite</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nos Programmes</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des initiatives concrètes pour répondre aux besoins éducatifs et professionnels de notre communauté.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockData.feproba.programs.map((program, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-amber-200 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-amber-600 mt-1" />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                      {program}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact section */}
        <div className="mt-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">L'Impact de FEPROBA</h3>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            En étroite collaboration avec les églises locales, les leaders communautaires 
            et nos partenaires internationaux, nous agissons comme un pont de solidarité.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Partenariats Locaux</h4>
              <p className="text-amber-100 text-sm">Collaboration avec églises et leaders communautaires</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Solidarité Active</h4>
              <p className="text-amber-100 text-sm">Pont entre les besoins et les ressources disponibles</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Transformation Sociale</h4>
              <p className="text-amber-100 text-sm">L'éducation comme outil de changement et d'espoir</p>
            </div>
          </div>

          <Button 
            onClick={() => navigate('/feproba-programmes')}
            className="mt-8 bg-white text-amber-600 hover:bg-amber-50 px-8 py-3 text-lg font-semibold transition-all duration-300"
          >
            Découvrir nos programmes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FEPROBA;