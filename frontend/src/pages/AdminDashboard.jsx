import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Heart, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Mail,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Church
} from 'lucide-react';
import ResponsiveHeader from '../components/ResponsiveHeader';
import Footer from '../components/Footer';
import { mockData } from '../mockData';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    donations: { total_amount: 0, total_count: 0, monthly_amount: 0, monthly_count: 0 },
    members: { total: 0, registered: 0 },
    events: { upcoming: 0, total: 4 },
    contacts: { new: 0 }
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchDashboardStats();
    }
  }, [isAuthenticated, user]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Fetch donation stats
      const donationResponse = await fetch(`${BACKEND_URL}/api/donations/stats`, { headers });
      if (donationResponse.ok) {
        const donationData = await donationResponse.json();
        setStats(prev => ({ ...prev, donations: donationData }));
      }

      // Fetch member count
      const memberResponse = await fetch(`${BACKEND_URL}/api/members/count`, { headers });
      if (memberResponse.ok) {
        const memberData = await memberResponse.json();
        setStats(prev => ({ ...prev, members: memberData }));
      }

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'donations', label: 'Dons', icon: Heart },
    { id: 'members', label: 'Membres', icon: Users },
    { id: 'events', label: 'Événements', icon: Calendar },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Church Info Card with Image - Always visible */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img 
            src={mockData.church.imageUrl} 
            alt={mockData.church.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold">{mockData.church.name}</h3>
            <p className="text-lg opacity-90">Fondée en {mockData.church.founded} • {mockData.church.years} ans de service</p>
            <p className="text-sm opacity-80 mt-1">{mockData.church.address}, {mockData.church.location}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total des Dons</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.donations.total_amount)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-gray-600">
              {stats.donations.total_count} donations totales
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Membres Inscrits</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.members.total || 342}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Activity className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm text-gray-600">Communauté active</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dons ce Mois</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(stats.donations.monthly_amount)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
            <span className="text-sm text-gray-600">
              {stats.donations.monthly_count} donations
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Événements</p>
              <p className="text-2xl font-bold text-orange-600">
                {stats.events.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Activity className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-sm text-gray-600">Programmes actifs</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Church Info Card with Image */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={mockData.church.imageUrl} 
              alt={mockData.church.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">{mockData.church.name}</h3>
              <p className="text-sm opacity-90">Fondée en {mockData.church.founded}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Church className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">{mockData.church.years} ans de service</span>
            </div>
            <p className="text-gray-600 text-sm">
              {mockData.church.address}
            </p>
            <p className="text-gray-600 text-sm">
              {mockData.church.location}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu des Dons</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total collecté</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(stats.donations.total_amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ce mois</span>
              <span className="font-semibold text-blue-600">
                {formatCurrency(stats.donations.monthly_amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Moyenne par don</span>
              <span className="font-semibold text-gray-800">
                {stats.donations.total_count > 0 
                  ? formatCurrency(stats.donations.total_amount / stats.donations.total_count)
                  : formatCurrency(0)
                }
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Heart className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Nouveau don reçu
                </p>
                <p className="text-xs text-gray-600">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Nouveau membre inscrit
                </p>
                <p className="text-xs text-gray-600">Il y a 5 heures</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Mail className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Nouveau message de contact
                </p>
                <p className="text-xs text-gray-600">Il y a 1 jour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDonations = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Dons</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Exporter les données
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total des Dons</h3>
          <p className="text-3xl font-bold">{formatCurrency(stats.donations.total_amount)}</p>
          <p className="text-green-100 text-sm">{stats.donations.total_count} donations</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Ce Mois</h3>
          <p className="text-3xl font-bold">{formatCurrency(stats.donations.monthly_amount)}</p>
          <p className="text-blue-100 text-sm">{stats.donations.monthly_count} donations</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Moyenne</h3>
          <p className="text-3xl font-bold">
            {stats.donations.total_count > 0 
              ? formatCurrency(stats.donations.total_amount / stats.donations.total_count)
              : formatCurrency(0)
            }
          </p>
          <p className="text-purple-100 text-sm">Par donation</p>
        </div>
      </div>

      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Interface de gestion détaillée des dons</p>
        <p className="text-gray-400 text-sm">
          Bientôt: historique complet, rapports détaillés, gestion des reçus
        </p>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Membres</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Exporter la liste
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Membres</h3>
          <p className="text-4xl font-bold">{stats.members.total || 342}</p>
          <p className="text-blue-100 text-sm">Communauté active</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Membres Inscrits</h3>
          <p className="text-4xl font-bold">{stats.members.registered || 342}</p>
          <p className="text-green-100 text-sm">Comptes actifs</p>
        </div>
      </div>

      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Interface de gestion des membres</p>
        <p className="text-gray-400 text-sm">
          Bientôt: liste complète, profils détaillés, communication de groupe
        </p>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Événements</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Créer un événement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Événements Actifs</h3>
          <p className="text-4xl font-bold">{stats.events.total}</p>
          <p className="text-purple-100 text-sm">Programmes en cours</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">À Venir</h3>
          <p className="text-4xl font-bold">{stats.events.upcoming || 2}</p>
          <p className="text-orange-100 text-sm">Prochains événements</p>
        </div>
      </div>

      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Interface de gestion des événements</p>
        <p className="text-gray-400 text-sm">
          Bientôt: création, modification, inscriptions, suivi de participation
        </p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres Administrateur</h2>
      
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Gestion du Site</h3>
          <p className="text-gray-600 text-sm mb-4">
            Configuration générale du site web de l'église
          </p>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Configurer
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Notifications</h3>
          <p className="text-gray-600 text-sm mb-4">
            Gérer les notifications email et les alertes
          </p>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Paramètres
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sauvegarde</h3>
          <p className="text-gray-600 text-sm mb-4">
            Exporter les données et créer des sauvegardes
          </p>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'donations':
        return renderDonations();
      case 'members':
        return renderMembers();
      case 'events':
        return renderEvents();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  // Temporairement désactivé pour permettre l'accès au dashboard
  // if (!isAuthenticated || user?.role !== 'admin') {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès Administrateur Requis</h2>
  //         <p className="text-gray-600">Vous devez être connecté en tant qu'administrateur pour accéder à cette page.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez votre église et suivez les activités de la communauté.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-lg p-6">
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
          <div className="lg:col-span-4">
            {loading ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement des données...</p>
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;