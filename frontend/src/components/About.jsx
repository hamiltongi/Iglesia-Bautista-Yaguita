import React from 'react';
import { Card } from './ui/card';
import { Heart, Users, BookOpen, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Amour",
      description: "L'amour de Dieu au centre de tout ce que nous faisons"
    },
    {
      icon: Users,
      title: "Communauté", 
      description: "Une famille unie dans la foi et l'entraide mutuelle"
    },
    {
      icon: BookOpen,
      title: "Éducation",
      description: "Formation spirituelle et développement personnel intégral"
    },
    {
      icon: Globe,
      title: "Mission",
      description: "Partager l'Évangile et transformer des vies dans notre communauté"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À Propos de <span className="text-blue-900">Notre Église</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Depuis notre fondation, nous sommes une communauté de foi engagée dans la transformation 
            des cœurs et de la société à travers l'amour du Christ.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Notre Histoire</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                L'Iglesia Bautista Yaguita de Pastor est située au cœur de Santiago, 
                République Dominicaine. Sous la direction inspirante du Pasteur Smith Dumont, 
                notre église s'est développée pour devenir bien plus qu'un lieu de culte.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous sommes une famille spirituelle qui croit en la puissance transformatrice 
                de l'Évangile et en l'importance de l'éducation pour le développement intégral 
                de la personne humaine.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Notre Vision</h4>
              <p className="text-blue-800 leading-relaxed">
                "Être un phare d'espoir et de transformation dans notre communauté, 
                formant des disciples qui impactent positivement la société à travers 
                l'amour, l'éducation et le service."
              </p>
            </div>
          </div>

          {/* Right content - Pastor photo */}
          <div className="relative">
            <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl">
              <img 
                src="https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/locsay3u_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg" 
                alt="Pasteur Smith Dumont" 
                className="w-full h-96 object-cover object-top rounded-xl"
              />
              <div className="mt-4 text-center">
                <h4 className="text-xl font-bold text-gray-900">Pasteur Smith Dumont</h4>
                <p className="text-blue-600 font-medium">Pasteur Principal</p>
                <p className="text-gray-600 mt-2">Serviteur dévoué et guide spirituel de notre communauté</p>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-200 rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-200 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Values section */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs Fondamentales</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ces valeurs guident chacune de nos actions et définissent qui nous sommes en tant que communauté de foi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Three institutions */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nos Trois Institutions</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une approche intégrée du ministère à travers l'église, l'éducation et la formation théologique.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-blue-900">L'Église</h4>
              <p className="text-gray-600">Le cœur spirituel de notre communauté, lieu de culte et de croissance dans la foi</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-amber-700">FEPROBA</h4>
              <p className="text-gray-600">Fondation éducative pour le développement social et professionnel</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-blue-900">ISL</h4>
              <p className="text-gray-600">Institut de formation théologique et de leadership chrétien</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;