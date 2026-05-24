// frontend/src/context/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { verifyToken } from '../api/authApi';

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await verifyToken();
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.warn("Token validation failed:", err.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = (userData, authToken) => {
    console.log('📝 Login called');
    console.log('👤 User data:', userData);
    console.log('🔑 Token:', authToken.substring(0, 50) + '...');
    
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    
    console.log('✅ Token stored in localStorage');
  };

  const logout = () => {
    console.log('📝 Logout called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};