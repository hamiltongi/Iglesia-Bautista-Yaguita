import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('token', data.access_token);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.detail || 'Erreur de connexion' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erreur réseau. Veuillez réessayer.' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('token', data.access_token);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.detail || 'Erreur d\'inscription' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Erreur réseau. Veuillez réessayer.' };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        return { success: true, user: data };
      } else {
        return { success: false, error: data.detail || 'Erreur de mise à jour' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Erreur réseau. Veuillez réessayer.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isMember: user?.role === 'member' || user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};