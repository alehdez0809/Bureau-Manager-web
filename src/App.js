import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './AuthContext.js';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Formulario from './componentes/iniciosesion.js';
import RegistrarCuenta from './componentes/registroCuenta.js';
import MenuInicial from './componentes/menuInicial.js';
import EdicionyRegistro from "./componentes/edicionyRegistro.js";
import NuevoCondominio from "./componentes/nuevoCondominio.js";
import EditoCondominio from "./componentes/edicionCondominio.js";
import NuevoEdificio from "./componentes/nuevoEdificio.js";
import EditoEdificio from "./componentes/edicionEdificio.js";
import NuevoDepartamento from "./componentes/nuevoDepa.js";
import EditoDepartamento from "./componentes/edicionDepa.js";
import NuevoInquilino from "./componentes/nuevoInquilino.js";
import MenuInquilino from "./componentes/menuInquilino.js";
import EditoInquilino from "./componentes/edicionInquilino.js";
import NuevoRecibo from "./componentes/nuevoRecibo.js";
import VerRecibo from "./componentes/verRecibos.js";
import Verificacion from "./componentes/verificacion.js";


function PrivateRoute({ children }) {
  const { authToken } = useAuth();

  return authToken ? children : <Navigate to="/" />;
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Formulario />}  />
          <Route path="/RegistrarCuenta" element={<RegistrarCuenta />}  />
          <Route path="/MenuPrincipal" element={<PrivateRoute> <MenuInicial /></PrivateRoute>}  />
          <Route path="/EdicionyRegistro" element={<PrivateRoute> <EdicionyRegistro /> </PrivateRoute>}  />
          <Route path="/NuevoCondominio" element={<PrivateRoute> <NuevoCondominio /> </PrivateRoute>}  />
          <Route path="/EditoCondominio" element={<PrivateRoute> <EditoCondominio /> </PrivateRoute>}  />
          <Route path="/NuevoEdificio" element={<PrivateRoute> <NuevoEdificio /> </PrivateRoute>}  />
          <Route path="/EditoEdificio" element={<PrivateRoute> <EditoEdificio /> </PrivateRoute>}  />
          <Route path="/NuevoDepartamento" element={<PrivateRoute> <NuevoDepartamento /> </PrivateRoute>}  />
          <Route path="/EditoDepartamento" element={<PrivateRoute> <EditoDepartamento /> </PrivateRoute>}  />
          <Route path="/NuevoInquilino" element={<PrivateRoute> <NuevoInquilino /> </PrivateRoute>}  />
          <Route path="/MenuInquilino" element={<PrivateRoute> <MenuInquilino /> </PrivateRoute>}  />
          <Route path="/EditoInquilino" element={<PrivateRoute> <EditoInquilino /> </PrivateRoute>}  />
          <Route path="/NuevoRecibo" element={<PrivateRoute> <NuevoRecibo /> </PrivateRoute>}  />
          <Route path="/VerRecibo" element={<PrivateRoute> <VerRecibo /> </PrivateRoute>}  />
          <Route path="/Verificacion" element={<Verificacion />}  />
        </Routes>
      </Router>
    </AuthProvider>  
  );
}

export default App;






