import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { mockData } from '../mockData';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/m9yrtrgf_Add_a_heading-removebg-preview.png" 
                alt="Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{mockData.church.name}</h3>
                <p className="text-gray-300">{mockData.church.location}</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Une communauté de foi au cœur de Santiago, dédiée à l'amour, 
              l'éducation et la transformation spirituelle. Rejoignez notre famille 
              spirituelle et découvrez l'amour inconditionnel du Christ.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{mockData.church.address}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${mockData.church.pastor.phone}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {mockData.church.pastor.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${mockData.church.pastor.email}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {mockData.church.pastor.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Liens Rapides</h4>
            <div className="space-y-3">
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors text-sm">À Propos</a>
              <a href="#services" className="block text-gray-300 hover:text-white transition-colors text-sm">Services</a>
              <a href="#feproba" className="block text-gray-300 hover:text-white transition-colors text-sm">FEPROBA</a>
              <a href="#isl" className="block text-gray-300 hover:text-white transition-colors text-sm">ISL</a>
              <a href="#ministries" className="block text-gray-300 hover:text-white transition-colors text-sm">Ministères</a>
              <a href="#events" className="block text-gray-300 hover:text-white transition-colors text-sm">Événements</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>

        {/* Service Times */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <h4 className="text-lg font-semibold mb-6 text-center text-blue-400">Horaires des Services</h4>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            {mockData.services.map((service) => (
              <div key={service.id} className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2 text-sm">{service.name}</h5>
                <p className="text-blue-400 text-sm">{service.day} - {service.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © 2025 {mockData.church.name}. Tous droits réservés.
            </p>
            <p className="text-sm">
              Pasteur {mockData.church.pastor.name} - Santiago, République Dominicaine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;