import React, { createContext, useContext, useState } from 'react';



const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Función para iniciar sesión y guardar el token
  const login = (token, id) => {
    setAuthToken(token);
    localStorage.setItem('authData', JSON.stringify({ token, id }));
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authData');
  };

  

  const value = {
    authToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
