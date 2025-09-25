import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Heart, Users, BookOpen, UserPlus, CheckCircle, Loader2 } from 'lucide-react';
import { mockData } from '../mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Hero = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    profession: ''
  });
  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/members/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setRegistrationStatus('success');
        setRegistrationData({
          name: '',
          email: '',
          phone: '',
          address: '',
          birthDate: '',
          profession: ''
        });
        setTimeout(() => {
          setShowRegistration(false);
          setRegistrationStatus(null);
        }, 3000);
      } else {
        throw new Error('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-amber-100 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium">
                <Heart className="w-4 h-4 mr-2" />
                Bienvenue dans la famille de Dieu
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-900">Église Baptiste</span>
                <br />
                <span className="text-amber-600">Yaguita de Pastor</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Une communauté de foi au cœur de Santiago, dédiée à l'amour, 
                l'éducation et la transformation spirituelle depuis {mockData.church.years} ans (fondée en {mockData.church.founded}).
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">{mockData.members?.registered || 342}</div>
                <div className="text-sm text-gray-600">Membres inscrits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{mockData.church.years}</div>
                <div className="text-sm text-gray-600">Ans de service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">3</div>
                <div className="text-sm text-gray-600">Institutions</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => setShowRegistration(true)}
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                S'enregistrer dans la grande famille
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => document.getElementById('ministries')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg transition-all duration-300"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explorer nos Ministères
              </Button>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <a href="#services" className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Services</h3>
                    <p className="text-sm text-gray-600">Nos cultes</p>
                  </div>
                </div>
              </a>

              <a href="#feproba" className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">FEPROBA</h3>
                    <p className="text-sm text-gray-600">Fondation</p>
                  </div>
                </div>
              </a>

              <a href="#isl" className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ISL</h3>
                    <p className="text-sm text-gray-600">Séminaire</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right content - Church image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/locsay3u_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg" 
                alt="Iglesia Bautista Yaguita de Pastor" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative elements around the image */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Inscription Membre</h3>
                <button 
                  onClick={() => setShowRegistration(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {registrationStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">Inscription réussie !</p>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Bienvenue dans la famille de Dieu !</p>
                </div>
              )}

              {registrationStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">❌ Erreur lors de l'inscription</p>
                  <p className="text-red-600 text-sm">Veuillez réessayer ou nous contacter.</p>
                </div>
              )}

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={registrationData.name}
                    onChange={handleRegistrationChange}
                    required
                    disabled={loading}
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleRegistrationChange}
                    required
                    disabled={loading}
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={registrationData.phone}
                    onChange={handleRegistrationChange}
                    required
                    disabled={loading}
                    placeholder="+1 (XXX) XXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={registrationData.address}
                    onChange={handleRegistrationChange}
                    disabled={loading}
                    placeholder="Votre adresse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <Input
                    type="date"
                    name="birthDate"
                    value={registrationData.birthDate}
                    onChange={handleRegistrationChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession
                  </label>
                  <Input
                    type="text"
                    name="profession"
                    value={registrationData.profession}
                    onChange={handleRegistrationChange}
                    disabled={loading}
                    placeholder="Votre profession"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      S'inscrire
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;