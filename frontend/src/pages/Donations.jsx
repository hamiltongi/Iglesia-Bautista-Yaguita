import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  Gift, 
  Loader, 
  CheckCircle,
  AlertCircle,
  Users,
  Church,
  HandHeart,
  Star
} from 'lucide-react';
import ResponsiveHeader from '../components/ResponsiveHeader';
import Footer from '../components/Footer';

const Donations = () => {
  const { user, isAuthenticated } = useAuth();
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationData, setDonationData] = useState({
    donor_name: user?.first_name + ' ' + user?.last_name || '',
    donor_email: user?.email || '',
    message: '',
    anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchDonationPackages();
    checkReturnFromStripe();
  }, []);

  const fetchDonationPackages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/donations/packages`);
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
        // Set default to support package
        const supportPackage = data.find(pkg => pkg.id === 'support');
        if (supportPackage) {
          setSelectedPackage(supportPackage);
        }
      }
    } catch (error) {
      console.error('Error fetching donation packages:', error);
    }
  };

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  const checkReturnFromStripe = () => {
    const sessionId = getUrlParameter('session_id');
    if (sessionId) {
      pollPaymentStatus(sessionId);
    }
  };

  const pollPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 5;
    const pollInterval = 2000;

    if (attempts >= maxAttempts) {
      setError('Vérification du statut de paiement expirée. Veuillez vérifier votre email de confirmation.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/donations/status/${sessionId}`);
      if (!response.ok) {
        throw new Error('Échec de la vérification du statut de paiement');
      }

      const data = await response.json();
      
      if (data.payment_status === 'paid') {
        // Payment successful
        showSuccessMessage(data.amount, data.currency);
        return;
      } else if (data.status === 'expired') {
        setError('Session de paiement expirée. Veuillez réessayer.');
        return;
      }

      // Continue polling if still pending
      setTimeout(() => pollPaymentStatus(sessionId, attempts + 1), pollInterval);
    } catch (error) {
      console.error('Error checking payment status:', error);
      setError('Erreur lors de la vérification du statut de paiement. Veuillez réessayer.');
    }
  };

  const showSuccessMessage = (amount, currency) => {
    // Create success overlay
    const successOverlay = document.createElement('div');
    successOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    successOverlay.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Don réussi !</h2>
        <p class="text-gray-600 mb-4">
          Merci pour votre généreux don de $${amount.toFixed(2)} ${currency.toUpperCase()}.
        </p>
        <p class="text-sm text-gray-500 mb-6">
          Que Dieu vous bénisse ! Votre soutien aide notre église à poursuivre sa mission.
        </p>
        <button onclick="this.closest('.fixed').remove(); window.history.replaceState({}, '', window.location.pathname);" 
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Continuer
        </button>
      </div>
    `;
    
    document.body.appendChild(successOverlay);
  };

  const handleInputChange = (e) => {
    setDonationData({
      ...donationData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handlePackageSelect = (packageData) => {
    setSelectedPackage(packageData);
    if (packageData.id !== 'custom') {
      setCustomAmount('');
    }
    setError('');
  };

  const handleDonate = async () => {
    setLoading(true);
    setError('');

    // Validation
    if (!selectedPackage) {
      setError('Veuillez sélectionner un montant de don');
      setLoading(false);
      return;
    }

    if (selectedPackage.id === 'custom' && (!customAmount || parseFloat(customAmount) <= 0)) {
      setError('Veuillez entrer un montant valide pour le don personnalisé');
      setLoading(false);
      return;
    }

    if (!donationData.donor_name.trim()) {
      setError('Veuillez entrer votre nom');
      setLoading(false);
      return;
    }

    if (!donationData.donor_email.trim()) {
      setError('Veuillez entrer votre email');
      setLoading(false);
      return;
    }

    try {
      const checkoutData = {
        package_id: selectedPackage.id,
        donation_type: 'one_time',
        message: donationData.message,
        anonymous: donationData.anonymous,
        donor_name: donationData.donor_name,
        donor_email: donationData.donor_email,
        origin_url: window.location.origin
      };

      if (selectedPackage.id === 'custom') {
        checkoutData.amount = parseFloat(customAmount);
      }

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add auth header if user is logged in
      if (isAuthenticated && user) {
        const token = localStorage.getItem('token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const response = await fetch(`${BACKEND_URL}/api/donations/checkout`, {
        method: 'POST',
        headers,
        body: JSON.stringify(checkoutData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de la création de la session de paiement');
      }

      const data = await response.json();
      
      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout non reçue');
      }
    } catch (error) {
      setError(error.message);
      console.error('Donation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Soutenez Notre Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre générosité nous permet de continuer à servir notre communauté et 
            à répandre l'amour du Christ à Santiago et au-delà.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">342+</div>
            <div className="text-gray-600">Familles aidées</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Church className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
            <div className="text-gray-600">Programmes communautaires</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <HandHeart className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
            <div className="text-gray-600">Vies transformées</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Packages */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choisissez votre don</h2>
            <div className="space-y-4 mb-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPackage?.id === pkg.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  } ${pkg.suggested ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  {pkg.suggested && (
                    <div className="absolute -top-2 -right-2">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                      <p className="text-gray-600 text-sm">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      {pkg.id !== 'custom' ? (
                        <div className="text-2xl font-bold text-blue-600">
                          {formatAmount(pkg.amount)}
                        </div>
                      ) : (
                        <Gift className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Amount Input */}
            {selectedPackage?.id === 'custom' && (
              <div className="mb-6">
                <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Montant personnalisé (USD)
                </label>
                <input
                  type="number"
                  id="customAmount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Entrez votre montant"
                  min="1"
                  step="0.01"
                />
              </div>
            )}
          </div>

          {/* Donation Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="donor_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="donor_name"
                  name="donor_name"
                  value={donationData.donor_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre nom complet"
                  required
                />
              </div>

              <div>
                <label htmlFor="donor_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="donor_email"
                  name="donor_email"
                  value={donationData.donor_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={donationData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Laissez un message d'encouragement..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={donationData.anonymous}
                  onChange={(e) => handleInputChange({ target: { name: 'anonymous', value: e.target.checked } })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Faire un don anonyme
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Résumé du don</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Montant:</span>
                <span className="font-semibold text-lg text-blue-600">
                  {selectedPackage?.id === 'custom' 
                    ? (customAmount ? formatAmount(parseFloat(customAmount)) : '$0.00')
                    : (selectedPackage ? formatAmount(selectedPackage.amount) : '$0.00')
                  }
                </span>
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={loading || !selectedPackage}
              className="w-full mt-6 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin w-5 h-5 mr-2" />
                  Traitement...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Faire un don
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Paiement sécurisé par Stripe. Vous recevrez un reçu par email.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Donations;