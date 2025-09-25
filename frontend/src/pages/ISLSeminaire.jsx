import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { BookOpen, Clock, Users, Award, ArrowLeft, Mail, Send, CheckCircle, Loader2, Globe, Star, GraduationCap } from 'lucide-react';
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

  // Programme ISL sur 3 niveaux
  const islPrograms = [
    {
      id: 1,
      level: "Certificat",
      duration: "1 an",
      description: "Formation de base en théologie biblique et leadership chrétien",
      courses: [
        "Introduction à la Théologie",
        "Histoire Biblique", 
        "Principes de Leadership",
        "Éthique Chrétienne"
      ],
      requirements: "Niveau secondaire requis",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/jwcwu2vo_Black%20%26%20Yellow%20Modern%20Travel%20Flyers%20%284%29.jpg"
    },
    {
      id: 2,
      level: "Diplôme", 
      duration: "2 ans",
      description: "Formation approfondie en théologie systématique et ministère pastoral",
      courses: [
        "Théologie Systématique",
        "Herméneutique Biblique",
        "Histoire de l'Église", 
        "Homilétique",
        "Conseil Pastoral",
        "Administration Ecclésiastique"
      ],
      requirements: "Certificat ISL ou équivalent",
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/v4uiy7o7_Black%20%26%20Yellow%20Modern%20Travel%20Flyers%20%285%29.jpg"
    },
    {
      id: 3,
      level: "Licence",
      duration: "3 ans", 
      description: "Formation complète en théologie avec spécialisations ministérielles",
      courses: [
        "Théologie Avancée",
        "Exégèse Biblique",
        "Théologie Pratique",
        "Missions et Évangélisation", 
        "Leadership Stratégique",
        "Recherche Théologique",
        "Ministères Spécialisés"
      ],
      requirements: "Diplôme ISL ou équivalent universitaire", 
      image: "https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/zgo1a5ns_Black%20%26%20Yellow%20Modern%20Travel%20Flyers%20%283%29.jpg"
    }
  ];

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
          course_name: `${selectedCourse.level} ISL - ${selectedCourse.duration}`
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Instituto de Seminario y Liderazgo</h1>
            <h2 className="text-2xl text-blue-100 mb-4">ISL - Formation Théologique Complète</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              En partenariat avec Louisiana Baptist University (LBU – USA). 
              Formation théologique sur 3 niveaux pour le ministère chrétien et le leadership spirituel.
            </p>
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="p-8 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/zgo1a5ns_Black%20%26%20Yellow%20Modern%20Travel%20Flyers%20%283%29.jpg" 
                alt="Louisiana Baptist University"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Partenariat Académique International</h3>
              <p className="text-lg text-gray-600 mb-4">
                L'ISL fonctionne en partenariat académique avec la <strong>Louisiana Baptist University (LBU – USA)</strong>, 
                garantissant une formation théologique de niveau international reconnue.
              </p>
              <div className="flex items-center space-x-4">
                <Globe className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Reconnaissance Internationale</p>
                  <p className="text-sm text-gray-600">Diplômes certifiés LBU-USA</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6">
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
            <p className="text-gray-600">Niveaux de Formation</p>
          </Card>
          <Card className="p-6 text-center bg-white shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
            <p className="text-gray-600">Ans d'Excellence</p>
          </Card>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos 3 Niveaux de Formation</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Un parcours progressif de formation théologique du certificat à la licence, 
            adapté à votre niveau et vos objectifs ministériels.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {islPrograms.map((program) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group">
              {/* Program Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image}
                  alt={`${program.level} ISL`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Program Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                    program.id === 1 ? 'bg-green-100 text-green-800' :
                    program.id === 2 ? 'bg-blue-100 text-blue-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {program.level}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(program.id)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {program.level} en Théologie
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {program.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Durée: {program.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{program.courses.length} matières</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{program.requirements}</span>
                  </div>
                </div>

                {/* Course List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Matières principales:</h4>
                  <div className="space-y-1">
                    {program.courses.slice(0, 3).map((course, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                        {course}
                      </div>
                    ))}
                    {program.courses.length > 3 && (
                      <div className="text-xs text-blue-600 font-medium">
                        +{program.courses.length - 3} autres matières
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setSelectedCourse(program)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Demander Informations
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Graduation Photos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Diplômés en Action</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les moments de fierté de nos cérémonies de graduation et 
            l'excellence de notre formation théologique.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="overflow-hidden">
            <img 
              src="https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/v4uiy7o7_Black%20%26%20Yellow%20Modern%20Travel%20Flyers%20%285%29.jpg"
              alt="Cérémonie de Graduation ISL"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Cérémonie de Graduation</h3>
              <p className="text-gray-600 text-sm">Remise des diplômes avec les autorités académiques</p>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <img 
              src="https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/jwcwu2vo_Black%20%26%20Yellow%20Modern%20Travel%20Flyers%20%284%29.jpg"
              alt="Cours ISL"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Formation en Classe</h3>
              <p className="text-gray-600 text-sm">Cours interactifs avec professeurs qualifiés</p>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <img 
              src="https://customer-assets.emergentagent.com/job_santiago-baptist/artifacts/ix4phsxh_IMG_2531.jpg"
              alt="Diplômés ISL"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">Groupe de Diplômés</h3>
              <p className="text-gray-600 text-sm">Promotion ISL prête pour le ministère</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="p-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Commencer Votre Formation ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté d'étudiants et découvrez votre potentiel 
            de leadership spirituel à travers notre formation théologique reconnue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
            >
              <Mail className="w-5 h-5 mr-2" />
              Nous contacter
            </Button>
            <Button 
              onClick={() => setSelectedCourse(islPrograms[0])}
              variant="outline"
              className="border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 text-lg font-semibold"
            >
              Commencer par le Certificat
            </Button>
          </div>
        </Card>
      </div>

      {/* Reservation Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Demande d'Information</h3>
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
                    <p className="text-green-800 font-medium">Demande envoyée !</p>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Nous vous contacterons bientôt avec les détails.</p>
                </div>
              )}

              {reservationStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">❌ Erreur lors de l'envoi</p>
                  <p className="text-red-600 text-sm">Veuillez réessayer ou nous contacter directement.</p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">{selectedCourse.level} en Théologie</h4>
                <p className="text-blue-800 text-sm mb-2">{selectedCourse.description}</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• Durée: {selectedCourse.duration}</p>
                  <p>• {selectedCourse.courses.length} matières</p>
                  <p>• Prérequis: {selectedCourse.requirements}</p>
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
                    placeholder="Vos questions sur ce programme ou vos motivations..."
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
                      Envoyer la demande
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