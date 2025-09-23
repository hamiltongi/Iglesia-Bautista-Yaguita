import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin, ArrowRight, Loader2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/events`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          throw new Error('Erreur lors du chargement des événements');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
        // Fallback to mock data
        const { mockData } = await import('../mockData');
        setEvents(mockData.events);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setNewsletterStatus('error');
    } finally {
      setNewsletterLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Chargement des événements...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prochains <span className="text-blue-900">Événements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos événements spéciaux, conférences et activités communautaires. 
            Des moments privilégiés pour grandir ensemble dans la foi.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {mockData.events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 group">
              {/* Event header with date */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Événement Spécial
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Event content */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {event.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Calendar section */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Calendrier Mensuel</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Restez informés de tous nos événements, services spéciaux et activités communautaires.
            </p>
          </div>
          
          {/* Weekly schedule preview */}
          <div className="grid md:grid-cols-7 gap-4 mb-8">
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day, index) => (
              <div key={day} className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">{day}</h4>
                <div className="space-y-2">
                  {index === 0 && (
                    <div className="bg-blue-100 text-blue-800 p-2 rounded text-xs">
                      Service 9h
                    </div>
                  )}
                  {index === 3 && (
                    <div className="bg-amber-100 text-amber-800 p-2 rounded text-xs">
                      Prière 19h
                    </div>
                  )}
                  {index === 5 && (
                    <div className="bg-green-100 text-green-800 p-2 rounded text-xs">
                      Jeunes 18h
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300"
            >
              Voir le calendrier complet
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Restez Connectés</h3>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir toutes les informations 
            sur nos événements et activités.
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Votre adresse e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-amber-600 hover:bg-amber-50 px-6 py-3 font-semibold transition-all duration-300">
              S'abonner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;