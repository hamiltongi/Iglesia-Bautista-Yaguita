import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Heart, Users, BookOpen, UserPlus, CheckCircle, Loader2, X } from 'lucide-react';
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
    profession: '',
    // Nouveaux champs demandés
    niveau_etude_classique: '',
    niveau_professionnel: '',
    cin_nif_passport: '',
    statut_matrimonial: '',
    qte_enfants: '',
    converti_status: '',
    don_ministeriel: ''
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
          profession: '',
          niveau_etude_classique: '',
          niveau_professionnel: '',
          cin_nif_passport: '',
          statut_matrimonial: '',
          qte_enfants: '',
          converti_status: '',
          don_ministeriel: ''
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
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-amber-100 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">
          {/* Left content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-xs sm:text-sm font-medium">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Bienvenue à l'Iglesia Bautista Yaguita de Pastor</span>
                <span className="sm:hidden">Bienvenue à l'Iglesia Bautista</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-900">Église Baptiste</span>
                <br />
                <span className="text-amber-600">Yaguita de Pastor</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                Une communauté de foi, d'espoir et d'amour dans le service de Dieu
              </p>
            </div>

            {/* Stats - Mobile-optimized */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900">342+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Membres inscrits</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl font-bold text-amber-600">14</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Ans de service</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900">3</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Institutions</div>
              </div>
            </div>

            {/* CTA Buttons - Mobile-optimized layout */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Primary action - Full width on mobile */}
              <Button 
                size="lg" 
                onClick={() => setShowRegistration(true)}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[56px]"
              >
                <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-semibold">S'enregistrer dans la grande famille</span>
              </Button>
              
              {/* Secondary actions - Grid on mobile, row on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => window.location.href = '/dons'}
                  className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium">Faire un Don</span>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => document.getElementById('ministries')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium">Explorer nos Ministères</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right content - Church Image - Mobile optimized */}
          <div className="lg:flex lg:justify-end order-1 lg:order-2">
            <div className="relative mx-auto lg:mx-0 max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="w-full">
                <img 
                  src={mockData.church.imageUrl} 
                  alt="Iglesia Bautista Yaguita de Pastor" 
                  className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl sm:rounded-3xl"></div>
              </div>
              
              {/* Floating testimonial card - Responsive */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-3 sm:-left-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl max-w-xs">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">Une communauté de foi</p>
                    <p className="text-xs text-gray-500">au cœur de Santiago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">S'enregistrer dans la grande famille</h3>
              <button
                onClick={() => setShowRegistration(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRegistrationSubmit} className="p-6">
              {registrationStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-green-700">Inscription réussie ! Bienvenue dans notre grande famille.</p>
                </div>
              )}

              {registrationStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">Erreur lors de l'inscription. Veuillez réessayer.</p>
                </div>
              )}

              {/* Informations personnelles de base */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={registrationData.name}
                      onChange={handleRegistrationChange}
                      placeholder="Votre nom complet"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={registrationData.email}
                      onChange={handleRegistrationChange}
                      placeholder="votre@email.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={registrationData.phone}
                      onChange={handleRegistrationChange}
                      placeholder="+1 829 123 4567"
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Date de naissance
                    </label>
                    <Input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={registrationData.birthDate}
                      onChange={handleRegistrationChange}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={registrationData.address}
                      onChange={handleRegistrationChange}
                      placeholder="Votre adresse"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                      Profession
                    </label>
                    <Input
                      type="text"
                      id="profession"
                      name="profession"
                      value={registrationData.profession}
                      onChange={handleRegistrationChange}
                      placeholder="Votre profession"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Nouveaux champs demandés */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Informations complémentaires</h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="niveau_etude_classique" className="block text-sm font-medium text-gray-700 mb-2">
                      Niveau d'étude classique
                    </label>
                    <select
                      id="niveau_etude_classique"
                      name="niveau_etude_classique"
                      value={registrationData.niveau_etude_classique}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="primaire">Primaire</option>
                      <option value="secondaire">Secondaire</option>
                      <option value="superieur">Supérieur</option>
                      <option value="universite">Université</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="niveau_professionnel" className="block text-sm font-medium text-gray-700 mb-2">
                      Niveau professionnel
                    </label>
                    <select
                      id="niveau_professionnel"
                      name="niveau_professionnel"
                      value={registrationData.niveau_professionnel}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="etudiant">Étudiant</option>
                      <option value="employe">Employé</option>
                      <option value="cadre">Cadre</option>
                      <option value="dirigeant">Dirigeant</option>
                      <option value="independant">Indépendant</option>
                      <option value="retraite">Retraité</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="cin_nif_passport" className="block text-sm font-medium text-gray-700 mb-2">
                      CIN/NIF/Passport
                    </label>
                    <Input
                      type="text"
                      id="cin_nif_passport"
                      name="cin_nif_passport"
                      value={registrationData.cin_nif_passport}
                      onChange={handleRegistrationChange}
                      placeholder="Numéro d'identification"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="statut_matrimonial" className="block text-sm font-medium text-gray-700 mb-2">
                      Statut matrimonial
                    </label>
                    <select
                      id="statut_matrimonial"
                      name="statut_matrimonial"
                      value={registrationData.statut_matrimonial}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="celibataire">Célibataire</option>
                      <option value="marie">Marié(e)</option>
                      <option value="divorce">Divorcé(e)</option>
                      <option value="veuf">Veuf/Veuve</option>
                      <option value="concubinage">En concubinage</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="qte_enfants" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantité d'enfants
                    </label>
                    <Input
                      type="number"
                      id="qte_enfants"
                      name="qte_enfants"
                      value={registrationData.qte_enfants}
                      onChange={handleRegistrationChange}
                      placeholder="0"
                      min="0"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="converti_status" className="block text-sm font-medium text-gray-700 mb-2">
                      Converti/Baptisé/Chute/En formation
                    </label>
                    <select
                      id="converti_status"
                      name="converti_status"
                      value={registrationData.converti_status}
                      onChange={handleRegistrationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="converti">Converti</option>
                      <option value="baptise">Baptisé</option>
                      <option value="chute">Chute</option>
                      <option value="en_formation">En formation</option>
                      <option value="nouveau">Nouveau</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="don_ministeriel" className="block text-sm font-medium text-gray-700 mb-2">
                    Vos dons ministériels
                  </label>
                  <textarea
                    id="don_ministeriel"
                    name="don_ministeriel"
                    value={registrationData.don_ministeriel}
                    onChange={handleRegistrationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Décrivez vos dons et talents ministériels..."
                    rows="3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Rejoindre la famille
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;