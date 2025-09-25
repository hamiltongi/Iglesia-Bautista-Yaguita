import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Lock, 
  Users, 
  MessageCircle, 
  Calendar, 
  Mail, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  LogOut,
  Settings,
  BarChart3
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({
    members: [],
    contacts: [],
    events: [],
    newsletters: [],
    reservations: []
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadData();
      } else {
        alert('Identifiants invalides');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [members, contacts, events, newsletters, reservations] = await Promise.all([
        fetch(`${BACKEND_URL}/api/members`).then(r => r.json()).catch(() => []),
        fetch(`${BACKEND_URL}/api/contact`).then(r => r.json()).catch(() => []),
        fetch(`${BACKEND_URL}/api/events`).then(r => r.json()).catch(() => []),
        fetch(`${BACKEND_URL}/api/newsletter/subscribers`).then(r => r.json()).catch(() => []),
        fetch(`${BACKEND_URL}/api/reservations`).then(r => r.json()).catch(() => [])
      ]);

      setData({ members, contacts, events, newsletters, reservations });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-gray-600">Iglesia Bautista Yaguita de Pastor</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
              </label>
              <Input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
                placeholder="hamilton"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
                placeholder="Code2022@"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', name: 'Tableau de bord', icon: BarChart3 },
    { id: 'members', name: 'Membres', icon: Users },
    { id: 'contacts', name: 'Messages', icon: MessageCircle },
    { id: 'events', name: 'Événements', icon: Calendar },
    { id: 'newsletters', name: 'Newsletter', icon: Mail },
    { id: 'reservations', name: 'Réservations', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Membres inscrits</p>
            <p className="text-3xl font-bold text-blue-600">{data.members.length}</p>
          </div>
          <Users className="w-12 h-12 text-blue-600 opacity-20" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Messages reçus</p>
            <p className="text-3xl font-bold text-green-600">{data.contacts.length}</p>
          </div>
          <MessageCircle className="w-12 h-12 text-green-600 opacity-20" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Événements</p>
            <p className="text-3xl font-bold text-purple-600">{data.events.length}</p>
          </div>
          <Calendar className="w-12 h-12 text-purple-600 opacity-20" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Abonnés newsletter</p>
            <p className="text-3xl font-bold text-amber-600">{data.newsletters.length}</p>
          </div>
          <Mail className="w-12 h-12 text-amber-600 opacity-20" />
        </div>
      </Card>

      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Derniers messages</h3>
        <div className="space-y-3">
          {data.contacts.slice(0, 3).map((contact, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.subject}</p>
                <p className="text-xs text-gray-500">{new Date(contact.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dernières réservations</h3>
        <div className="space-y-3">
          {data.reservations.slice(0, 3).map((reservation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Settings className="w-5 h-5 text-amber-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">{reservation.name}</p>
                <p className="text-sm text-gray-600">{reservation.course_name} ({reservation.course_type})</p>
                <p className="text-xs text-gray-500">{new Date(reservation.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderDataTable = (items, type) => {
    if (items.length === 0) {
      return <p className="text-gray-500 text-center py-8">Aucune donnée disponible</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {type === 'members' && (
                <>
                  <th className="border border-gray-200 px-4 py-2 text-left">Nom</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Téléphone</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                </>
              )}
              {type === 'contacts' && (
                <>
                  <th className="border border-gray-200 px-4 py-2 text-left">Nom</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Sujet</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                </>
              )}
              {type === 'newsletters' && (
                <>
                  <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Nom</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Statut</th>
                </>
              )}
              {type === 'reservations' && (
                <>
                  <th className="border border-gray-200 px-4 py-2 text-left">Nom</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Cours</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {type === 'members' && (
                  <>
                    <td className="border border-gray-200 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.phone}</td>
                    <td className="border border-gray-200 px-4 py-2">{new Date(item.registration_date).toLocaleDateString('fr-FR')}</td>
                  </>
                )}
                {type === 'contacts' && (
                  <>
                    <td className="border border-gray-200 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.subject}</td>
                    <td className="border border-gray-200 px-4 py-2">{new Date(item.created_at).toLocaleDateString('fr-FR')}</td>
                  </>
                )}
                {type === 'newsletters' && (
                  <>
                    <td className="border border-gray-200 px-4 py-2">{item.email}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.name || 'N/A'}</td>
                    <td className="border border-gray-200 px-4 py-2">{new Date(item.subscribed_at).toLocaleDateString('fr-FR')}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                  </>
                )}
                {type === 'reservations' && (
                  <>
                    <td className="border border-gray-200 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.course_name}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${item.course_type === 'feproba' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.course_type === 'feproba' ? 'FEPROBA' : 'ISL'}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">{new Date(item.created_at).toLocaleDateString('fr-FR')}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Administration - Iglesia Bautista Yaguita de Pastor
            </h1>
            <Button 
              variant="ghost" 
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {tabs.find(t => t.id === activeTab)?.name}
                </h2>
                <Button 
                  onClick={loadData}
                  variant="outline"
                  size="sm"
                >
                  Actualiser
                </Button>
              </div>

              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'members' && renderDataTable(data.members, 'members')}
              {activeTab === 'contacts' && renderDataTable(data.contacts, 'contacts')}
              {activeTab === 'events' && renderDataTable(data.events, 'events')}
              {activeTab === 'newsletters' && renderDataTable(data.newsletters, 'newsletters')}
              {activeTab === 'reservations' && renderDataTable(data.reservations, 'reservations')}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;