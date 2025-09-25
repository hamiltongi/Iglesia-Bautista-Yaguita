import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const RegisterModal = ({ isOpen, onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    // Nouveaux champs optionnels
    niveau_etude_classique: '',
    niveau_professionnel: '',
    cin_nif_passport: '',
    statut_matrimonial: '',
    qte_enfants: '',
    converti_status: '',
    don_ministeriel: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { t } = useLanguage();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const { confirmPassword, ...registrationData } = formData;
    const result = await register(registrationData);

    if (result.success) {
      onClose();
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phone: '',
        niveau_etude_classique: '',
        niveau_professionnel: '',
        cin_nif_passport: '',
        statut_matrimonial: '',
        qte_enfants: '',
        converti_status: '',
        don_ministeriel: ''
      });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">{t('inscription')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Champs obligatoires */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations requises</h3>
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('prenom')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('prenom')}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('nom')} *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('nom')}
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                {t('nomUtilisateur')} *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('nomUtilisateur')}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')} *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('telephone')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 829 123 4567"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('motDePasse')} *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {t('confirmerMotDePasse')} *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          {/* Nouveaux champs optionnels */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations complémentaires (optionnelles)</h3>
            
            {/* Niveau d'étude classique */}
            <div className="mb-4">
              <label htmlFor="niveau_etude_classique" className="block text-sm font-medium text-gray-700 mb-2">
                {t('niveauEtudeClassique')}
              </label>
              <select
                id="niveau_etude_classique"
                name="niveau_etude_classique"
                value={formData.niveau_etude_classique}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner...</option>
                <option value="primaire">Primaire</option>
                <option value="secondaire">Secondaire</option>
                <option value="superieur">Supérieur</option>
                <option value="universite">Université</option>
              </select>
            </div>

            {/* Niveau professionnel */}
            <div className="mb-4">
              <label htmlFor="niveau_professionnel" className="block text-sm font-medium text-gray-700 mb-2">
                {t('niveauProfessionnel')}
              </label>
              <select
                id="niveau_professionnel"
                name="niveau_professionnel"
                value={formData.niveau_professionnel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* CIN/NIF/Passport */}
            <div className="mb-4">
              <label htmlFor="cin_nif_passport" className="block text-sm font-medium text-gray-700 mb-2">
                {t('cinNifPassport')}
              </label>
              <input
                type="text"
                id="cin_nif_passport"
                name="cin_nif_passport"
                value={formData.cin_nif_passport}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numéro d'identification"
              />
            </div>

            {/* Statut matrimonial */}
            <div className="mb-4">
              <label htmlFor="statut_matrimonial" className="block text-sm font-medium text-gray-700 mb-2">
                {t('statutMatrimonial')}
              </label>
              <select
                id="statut_matrimonial"
                name="statut_matrimonial"
                value={formData.statut_matrimonial}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner...</option>
                <option value="celibataire">Célibataire</option>
                <option value="marie">Marié(e)</option>
                <option value="divorce">Divorcé(e)</option>
                <option value="veuf">Veuf/Veuve</option>
                <option value="concubinage">En concubinage</option>
              </select>
            </div>

            {/* Quantité d'enfants */}
            <div className="mb-4">
              <label htmlFor="qte_enfants" className="block text-sm font-medium text-gray-700 mb-2">
                {t('qteEnfants')}
              </label>
              <input
                type="number"
                id="qte_enfants"
                name="qte_enfants"
                value={formData.qte_enfants}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>

            {/* Converti/Baptisé/Chute/En formation */}
            <div className="mb-4">
              <label htmlFor="converti_status" className="block text-sm font-medium text-gray-700 mb-2">
                {t('convertiStatus')}
              </label>
              <select
                id="converti_status"
                name="converti_status"
                value={formData.converti_status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner...</option>
                <option value="converti">Converti</option>
                <option value="baptise">Baptisé</option>
                <option value="chute">Chute</option>
                <option value="en_formation">En formation</option>
                <option value="nouveau">Nouveau</option>
              </select>
            </div>

            {/* Dons ministériels */}
            <div className="mb-4">
              <label htmlFor="don_ministeriel" className="block text-sm font-medium text-gray-700 mb-2">
                {t('donMinisteriel')}
              </label>
              <textarea
                id="don_ministeriel"
                name="don_ministeriel"
                value={formData.don_ministeriel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Décrivez vos dons et talents ministériels..."
                rows="3"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-5 h-5 mr-2" />
                {t('envoi')}...
              </>
            ) : (
              t('sInscrire')
            )}
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('dejaUnCompte')}{' '}
              <button
                type="button"
                onClick={switchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('seConnecter')}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;