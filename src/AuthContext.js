import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Función para iniciar sesión y guardar el token
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
