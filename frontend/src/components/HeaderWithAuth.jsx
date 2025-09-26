import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
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
    { name: 'Contact', href: '#contact' }
  ];

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handlePortalAccess = () => {
    window.location.href = '/portail-membre';
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+1 (829) 295-5254</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>ibautistayaguitadelpastor@gmail.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Avenida Nunez de Carcerez #9, Santiago RD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/m9yrtrgf_Add_a_heading-removebg-preview.png" 
              alt="Logo Iglesia Bautista" 
              className="h-16 w-16 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-blue-900">Iglesia Bautista</h1>
              <p className="text-sm text-blue-700">Yaguita de Pastor</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex space-x-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Auth Buttons and Language Selector */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.first_name}
                  </span>
                </div>
                <Button
                  onClick={handlePortalAccess}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{t('portailMembre')}</span>
                </Button>
                {user?.role === 'admin' && (
                  <Button
                    onClick={() => window.location.href = '/admin-dashboard'}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Admin</span>
                  </Button>
                )}
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-red-600"
                  title={t('deconnexion')}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
                <LanguageSelector />
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <Button
                  onClick={() => setShowLoginModal(true)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-900"
                >
                  {t('connexion')}
                </Button>
                <Button
                  onClick={() => setShowRegisterModal(true)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t('inscription')}
                </Button>
                <LanguageSelector />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.first_name} {user?.last_name}
                    </span>
                  </div>
                  <Button
                    onClick={handlePortalAccess}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mon Portail
                  </Button>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    Connexion
                  </Button>
                  <Button
                    onClick={() => {
                      setShowRegisterModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    S'inscrire
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToRegister={switchToRegister}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        switchToLogin={switchToLogin}
      />
    </header>
  );
};

export default Header;