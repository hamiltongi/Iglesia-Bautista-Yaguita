import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar with contact info - Optimized for mobile */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            {/* Mobile: Show only phone */}
            <div className="flex items-center space-x-2 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Phone size={12} className="sm:w-[14px] sm:h-[14px]" />
                <span className="hidden sm:inline">+1 (829) 295-5254</span>
                <span className="sm:hidden">+1 829-295-5254</span>
              </div>
              {/* Email only visible on larger screens */}
              <div className="hidden sm:flex items-center space-x-2">
                <Mail size={14} />
                <span className="hidden md:inline">ibautistayaguitadelpastor@gmail.com</span>
                <span className="md:hidden">Contact</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Avenida Nunez de Carcerez #9, Santiago RD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header - Better mobile layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo - More compact on mobile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/m9yrtrgf_Add_a_heading-removebg-preview.png" 
              alt="Logo Iglesia Bautista" 
              className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-blue-900 leading-tight">Iglesia Bautista</h1>
              <p className="text-xs sm:text-sm text-blue-700">Yaguita de Pastor</p>
            </div>
          </div>

          {/* Desktop Navigation - Conditionally rendered */}
          {!isMobile && (
            <div className="desktop-nav-only">
              <nav className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          )}

          {/* Mobile menu button - Show only on mobile */}
          {isMobile && (
            <div className="mobile-nav-only">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 border border-gray-200 shadow-sm bg-white"
                aria-label="Menu de navigation"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation - Enhanced with better spacing and styling */}
      {isMenuOpen && (
        <div className="mobile-nav-only bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100 active:bg-blue-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Quick contact buttons in mobile menu */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="tel:+18292955254" 
                  className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  Appeler
                </a>
                <a 
                  href="mailto:ibautistayaguitadelpastor@gmail.com" 
                  className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;