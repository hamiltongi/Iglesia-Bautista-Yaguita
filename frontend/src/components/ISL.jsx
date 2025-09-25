import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Users, Award, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { mockData } from '../mockData';
import { useNavigate } from 'react-router-dom';

const ISL = () => {
  const navigate = useNavigate();

  return (
    <section id="isl" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Formation Théologique
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-blue-900">ISL</span>
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            Instituto de Seminario y Liderazgo
          </h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Une institution biblique et théologique fondée en 2019, dédiée à la formation 
            d'hommes et femmes engagés dans le ministère chrétien et le leadership spirituel.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-sm text-blue-600 font-medium">
                <span>Fondé en {mockData.isl.founded}</span>
                <span>•</span>
                <span>Santiago, République Dominicaine</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900">Notre Mission Éducative</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Former des hommes et des femmes engagés dans le ministère chrétien, 
                capables de servir efficacement leurs églises, leurs communautés et 
                la société en général avec excellence et intégrité.
              </p>
              
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">Partenariat Académique</h4>
                <p className="text-blue-800 leading-relaxed">
                  En partenariat avec la <span className="font-semibold">{mockData.isl.partnership}</span>, 
                  nous offrons un programme de formation théologique de haute qualité sur 3 ans.
                </p>
              </div>
            </div>
          </div>

          {/* Right content - Academic info */}
          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{mockData.isl.program}</h4>
                <p className="text-gray-600">Formation complète et approfondie</p>
              </div>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">{mockData.isl.students}+</div>
                <p className="text-sm text-gray-600">Étudiants actifs</p>
              </Card>
              <Card className="p-6 text-center border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">{mockData.isl.graduates}+</div>
                <p className="text-sm text-gray-600">Diplômés en service</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Programme d'Études</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un curriculum complet couvrant les matières fondamentales pour l'édification 
              spirituelle et le leadership chrétien efficace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.isl.courses?.map((course, index) => (
              <Card key={course.id || index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group bg-white">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                      {typeof course === 'string' ? course : course.name}
                    </h4>
                    {course.level && (
                      <p className="text-sm text-blue-600 mt-1">{course.level}</p>
                    )}
                  </div>
                </div>
              </Card>
            )) || mockData.isl.courses.map((course, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group bg-white">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                      {course}
                    </h4>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action and features */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12">
          {/* Left - CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Appelé au Ministère ?</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Découvrez votre potentiel de leadership spirituel à travers notre 
              programme de formation théologique rigoureux et pratique.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-200" />
                <span className="text-sm">Formation académique de qualité</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-200" />
                <span className="text-sm">Mentorat pastoral personnalisé</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-200" />
                <span className="text-sm">Expérience pratique en ministère</span>
              </div>
            </div>
            
            <Button 
              onClick={() => navigate('/isl-seminaire')}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 font-semibold transition-all duration-300 w-full"
            >
              Demander des informations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right - Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi Choisir ISL ?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Partenariat International</h4>
                  <p className="text-gray-600 text-sm">Reconnaissance académique avec Louisiana Baptist University (USA)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Formation Pratique</h4>
                  <p className="text-gray-600 text-sm">Équilibre entre théorie théologique et application pratique</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Excellence Académique</h4>
                  <p className="text-gray-600 text-sm">Curriculum approfondi et professeurs qualifiés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ISL;