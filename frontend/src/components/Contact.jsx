import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Loader2 } from 'lucide-react';
import { mockData } from '../mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            <span className="text-blue-900">Contactez</span> Nous
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Nous serions ravis d'entendre de vous ! Que ce soit pour une question, 
            une prière ou pour planifier une visite, n'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Adresse</h4>
                    <p className="text-gray-600">{mockData.church.address}</p>
                    <p className="text-gray-600">{mockData.church.location}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Téléphone</h4>
                    <a href={`tel:${mockData.church.pastor.phone}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                      {mockData.church.pastor.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">E-mail</h4>
                    <a href={`mailto:${mockData.church.pastor.email}`} className="text-blue-600 hover:text-blue-700 transition-colors block">
                      {mockData.church.pastor.email}
                    </a>
                    <a href={`mailto:${mockData.church.pastor.alternateEmail}`} className="text-blue-600 hover:text-blue-700 transition-colors block">
                      {mockData.church.pastor.alternateEmail}
                    </a>
                  </div>
                </div>

                {/* Service Times */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Horaires des Services</h4>
                    <div className="space-y-1 text-sm">
                      {mockData.services.map((service) => (
                        <p key={service.id} className="text-gray-600">
                          <span className="font-medium">{service.name}:</span> {service.day} à {service.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pastor Info */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_5b3d9efd-acc4-4d0b-8611-b313beec4754/artifacts/locsay3u_322a8dcb-23be-4d4a-ad48-d511a6930646.jpeg"
                  alt={mockData.church.pastor.name}
                  className="w-16 h-16 rounded-full object-cover object-top"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{mockData.church.pastor.name}</h4>
                  <p className="text-blue-600 font-medium">Pasteur Principal</p>
                  <p className="text-gray-600 text-sm">Disponible pour conseil pastoral et prière</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Envoyez-nous un Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✅ Message envoyé avec succès !</p>
                    <p className="text-green-600 text-sm">Nous vous contacterons bientôt.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">❌ Erreur lors de l'envoi</p>
                    <p className="text-red-600 text-sm">Veuillez réessayer ou nous contacter directement.</p>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Votre nom complet"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="votre@email.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Votre numéro de téléphone"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      placeholder="Sujet de votre message"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Écrivez votre message ici..."
                    rows={5}
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <Card className="p-8 bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comment nous trouver</h3>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Carte interactive sera intégrée ici</p>
                <p className="text-sm text-gray-500 mt-2">{mockData.church.address}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;