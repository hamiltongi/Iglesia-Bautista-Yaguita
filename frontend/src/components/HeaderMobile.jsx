import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '#home' },
    { name: 'À Propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'FEPROBA', href: '#feproba' },
    { name: 'ISL', href: '#isl' },
    { name: 'Ministères', href: '#ministries' },
    { name: 'Événements', href: '#events' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
    { name: 'Dashboard', href: '/admin-dashboard' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
      {/* Compact contact bar for mobile */}
      <div className="bg-blue-900 text-white py-2">
        <div className="w-full mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Phone size={12} />
                <span>+1 829-295-5254</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-1">
              <MapPin size={12} />
              <span className="truncate">Santiago RD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main mobile header */}
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Compact logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/m9yrtrgf_Add_a_heading-removebg-preview.png" 
              alt="Logo Iglesia Bautista" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-blue-900 leading-tight">Iglesia Bautista</h1>
              <p className="text-sm text-blue-700">Yaguita de Pastor</p>
            </div>
          </div>

          {/* Always visible hamburger button - Larger for touch accessibility */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-4 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 shadow-sm bg-white transition-colors min-w-[48px] min-h-[48px]"
            aria-label="Menu de navigation"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-6 py-4 rounded-lg text-lg font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100 active:bg-blue-100 min-h-[48px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className="text-blue-400 text-sm">{index + 1}</span>
                </div>
              </a>
            ))}
            
            {/* Quick contact actions */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <p className="text-sm font-semibold text-gray-600 mb-3 px-4">Contact Rapide</p>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="tel:+18292955254" 
                  className="flex items-center justify-center px-6 py-4 bg-green-50 text-green-700 rounded-lg text-base font-medium hover:bg-green-100 transition-colors min-h-[48px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={16} className="mr-2" />
                  Appeler
                </a>
                <a 
                  href="mailto:ibautistayaguitadelpastor@gmail.com" 
                  className="flex items-center justify-center px-6 py-4 bg-blue-50 text-blue-700 rounded-lg text-base font-medium hover:bg-blue-100 transition-colors min-h-[48px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default HeaderMobile;