import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Calendar, 
  Heart, 
  BookOpen, 
  Settings, 
  LogOut,
  Edit3,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Gift
} from 'lucide-react';
import ResponsiveHeader from '../components/ResponsiveHeader';
import Footer from '../components/Footer';

const MemberPortal = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    profession: user?.profession || '',
    bio: user?.bio || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await updateProfile(formData);

    if (result.success) {
      setMessage('Profil mis à jour avec succès !');
      setIsEditing(false);
    } else {
      setMessage(result.error || 'Erreur lors de la mise à jour');
    }

    setLoading(false);
  };

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'events', label: 'Mes Événements', icon: Calendar },
    { id: 'donations', label: 'Mes Dons', icon: Heart },
    { id: 'ministries', label: 'Mes Ministères', icon: BookOpen },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const renderProfile = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('succès') 
            ? 'bg-green-50 border border-green-200 text-green-600' 
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          {message}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio / Témoignage
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Partagez votre témoignage ou une courte biographie..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Mise à jour...' : 'Sauvegarder les modifications'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-gray-600">@{user?.username}</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {user?.role === 'admin' ? 'Administrateur' : 'Membre'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{user?.email}</span>
            </div>
            {user?.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user?.phone}</span>
              </div>
            )}
            {user?.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user?.address}</span>
              </div>
            )}
            {user?.profession && (
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user?.profession}</span>
              </div>
            )}
          </div>

          {user?.bio && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Bio / Témoignage</h4>
              <p className="text-gray-700">{user?.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">
                ${user?.donation_total?.toFixed(2) || '0.00'}
              </div>
              <div className="text-green-600 text-sm">Total des dons</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">
                {user?.events_attended?.length || 0}
              </div>
              <div className="text-purple-600 text-sm">Événements participés</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-800">
                {user?.ministry_involvement?.length || 0}
              </div>
              <div className="text-orange-600 text-sm">Ministères impliqués</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderEvents = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Mes Événements</h2>
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Cette fonctionnalité sera bientôt disponible !</p>
        <p className="text-gray-400 text-sm">Vous pourrez voir et gérer vos inscriptions aux événements.</p>
      </div>
    </div>
  );

  const renderDonations = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Mes Dons</h2>
        <button
          onClick={() => window.location.href = '/dons'}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Heart className="w-4 h-4" />
          <span>Faire un don</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Gift className="w-8 h-8 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Total des dons</h3>
          </div>
          <div className="text-3xl font-bold text-green-900">
            ${user?.donation_total?.toFixed(2) || '0.00'}
          </div>
          <p className="text-green-600 text-sm">Merci pour votre générosité !</p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">Statut</h3>
          </div>
          <div className="text-lg font-semibold text-blue-900">
            {user?.donation_total > 0 ? 'Donateur fidèle' : 'Nouveau membre'}
          </div>
          <p className="text-blue-600 text-sm">
            {user?.donation_total > 100 ? 'Partenaire de la mission' : 'Bienvenue dans notre famille !'}
          </p>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des dons</h3>
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Fonctionnalité en développement</p>
          <p className="text-gray-400 text-sm">
            Bientôt vous pourrez voir l'historique détaillé de vos dons
          </p>
        </div>
      </div>
    </div>
  );

  const renderMinistries = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Mes Ministères</h2>
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Gestion des ministères à venir !</p>
        <p className="text-gray-400 text-sm">Vous pourrez vous inscrire et gérer votre participation aux ministères.</p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h2>
      <div className="space-y-6">
        <div className="p-4 border border-red-200 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 mb-2">Zone de Danger</h3>
          <p className="text-red-600 text-sm mb-4">
            Cette action déconnectera votre compte de cet appareil.
          </p>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'events':
        return renderEvents();
      case 'donations':
        return renderDonations();
      case 'ministries':
        return renderMinistries();
      case 'settings':
        return renderSettings();
      default:
        return renderProfile();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder au portail membre.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user?.first_name} !
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez votre profil et participez à la vie de notre communauté.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-lg p-6">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MemberPortal;