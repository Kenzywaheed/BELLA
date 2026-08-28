import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authAPI.getCurrentUser();
          setCurrentUser(user);
        } catch (error) {
          console.error('Failed to fetch user', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const data = await authAPI.login(credentials);
    if (data.user) {
      setCurrentUser(data.user);
    } else {
      // Fetch user profile if login doesn't return user directly
      const user = await authAPI.getCurrentUser();
      setCurrentUser(user);
    }
    return data;
  };

  const register = async (userData) => {
    return await authAPI.register(userData);
  };

  const logout = async () => {
    await authAPI.logout();
    setCurrentUser(null);
  };

  const openModal = (view = 'login') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  const closeModal = () => {
    setIsAuthModalOpen(false);
    setPendingAction(null); // Clear any pending actions if modal is closed without login
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    isAuthModalOpen,
    authView,
    setAuthView,
    openModal,
    closeModal,
    pendingAction,
    setPendingAction
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
