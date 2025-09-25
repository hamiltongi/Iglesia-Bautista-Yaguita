import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { BookOpen, Clock, Users, Award, ArrowLeft, Mail, Send, CheckCircle, Loader2, Globe } from 'lucide-react';
import { mockData } from '../mockData';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ISLSeminaire = () => {
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
          course_type: 'isl',
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Séminaire ISL</h1>
            <h2 className="text-2xl text-blue-100 mb-4">Instituto de Seminario y Liderazgo</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Formation théologique complète pour le ministère chrétien et le leadership spirituel. 
              En partenariat avec Louisiana Baptist University (LBU – USA).
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{mockData.isl.students}+</div>
            <p className="text-gray-600">Étudiants Actifs</p>
          </Card>
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{mockData.isl.graduates}+</div>
            <p className="text-gray-600">Diplômés en Service</p>
          </Card>
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <p className="text-gray-600">Années de Formation</p>
          </Card>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Cours Théologiques</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un curriculum complet structuré sur 3 niveaux pour une formation théologique approfondie et pratique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockData.isl.courses?.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group">
              {/* Course Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-blue-600" />
              </div>
              
              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {course.level}
                  </span>
                  <div className="flex items-center text-blue-600">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="text-xs">Certifié</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {course.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {course.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Durée: {course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Partenariat LBU-USA</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Réserver par Email
                </Button>
              </div>
            </Card>
          )) || 
          // Fallback for old data structure
          mockData.isl.courses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-blue-600" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {course}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Formation approfondie en {course.toLowerCase()} avec application pratique au ministère.
                </p>
                
                <Button 
                  onClick={() => setSelectedCourse({id: index, name: course})}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Réserver par Email
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Excellence Académique</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une formation théologique de haut niveau qui prépare des leaders spirituels 
              compétents pour le service de l'Église et de la société.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Partenariat International</h3>
              <p className="text-gray-600 text-sm">Reconnaissance avec Louisiana Baptist University</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Formation Pratique</h3>
              <p className="text-gray-600 text-sm">Équilibre théorie et application ministérielle</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Curriculum Complet</h3>
              <p className="text-gray-600 text-sm">Programme structuré sur 3 ans</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Diplôme Reconnu</h3>
              <p className="text-gray-600 text-sm">Certification internationale valide</p>
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

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">{selectedCourse.name}</h4>
                <p className="text-blue-800 text-sm mb-2">
                  {selectedCourse.description || `Formation approfondie en ${selectedCourse.name.toLowerCase()}`}
                </p>
                {selectedCourse.level && (
                  <div className="text-xs text-blue-700">
                    <p>Niveau: {selectedCourse.level}</p>
                    <p>Durée: {selectedCourse.duration}</p>
                  </div>
                )}
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
                    placeholder="Questions ou motivations pour cette formation..."
                    rows={3}
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

export default ISLSeminaire;