import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { GraduationCap, Clock, Users, Star, ArrowLeft, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { mockData } from '../mockData';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const FEPROBAProgrammes = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [reservationStatus, setReservationStatus] = useState(null);

  const handleReservationChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value
    });
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    setLoading(true);
    setReservationStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reservationData,
          course_type: 'feproba',
          course_name: selectedCourse.name
        }),
      });

      if (response.ok) {
        setReservationStatus('success');
        setReservationData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setTimeout(() => {
          setSelectedCourse(null);
          setReservationStatus(null);
        }, 3000);
      } else {
        throw new Error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Reservation error:', error);
      setReservationStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white hover:bg-opacity-20 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Programmes FEPROBA</h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Découvrez nos formations professionnelles et notre école classique 
              pour transformer votre avenir éducatif et professionnel.
            </p>
          </div>
        </div>
      </div>

      {/* Programmes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.feproba.disciplines.map((discipline) => (
            <Card key={discipline.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-amber-200 group">
              {/* Course Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-amber-600" />
              </div>
              
              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    {discipline.level}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {discipline.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {discipline.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-amber-600" />
                    <span>Durée: {discipline.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-amber-600" />
                    <span>Âge: {discipline.age}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setSelectedCourse(discipline)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Réserver par Email
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Choisir FEPROBA ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une formation complète qui allie excellence académique et valeurs chrétiennes pour votre développement personnel et professionnel.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Formation Pratique</h3>
              <p className="text-gray-600">Des cours pratiques avec des équipements modernes et des formateurs expérimentés.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accompagnement Personnel</h3>
              <p className="text-gray-600">Suivi individualisé et soutien continu pour garantir votre réussite.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Certification Reconnue</h3>
              <p className="text-gray-600">Diplômes et certificats reconnus pour votre insertion professionnelle.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Réservation - {selectedCourse.name}</h3>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {reservationStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-medium">Réservation envoyée !</p>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Nous vous contacterons bientôt.</p>
                </div>
              )}

              {reservationStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">❌ Erreur lors de la réservation</p>
                  <p className="text-red-600 text-sm">Veuillez réessayer ou nous contacter directement.</p>
                </div>
              )}

              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-amber-900 mb-2">{selectedCourse.name}</h4>
                <p className="text-amber-800 text-sm mb-2">{selectedCourse.description}</p>
                <div className="text-xs text-amber-700">
                  <p>Niveau: {selectedCourse.level}</p>
                  <p>Durée: {selectedCourse.duration}</p>
                  <p>Âge requis: {selectedCourse.age}</p>
                </div>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={reservationData.name}
                    onChange={handleReservationChange}
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
                    value={reservationData.email}
                    onChange={handleReservationChange}
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
                    value={reservationData.phone}
                    onChange={handleReservationChange}
                    required
                    disabled={loading}
                    placeholder="+1 (XXX) XXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (optionnel)
                  </label>
                  <Textarea
                    name="message"
                    value={reservationData.message}
                    onChange={handleReservationChange}
                    disabled={loading}
                    placeholder="Questions ou informations supplémentaires..."
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer la réservation
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FEPROBAProgrammes;