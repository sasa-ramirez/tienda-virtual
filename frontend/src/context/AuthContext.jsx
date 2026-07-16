import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (tokenGuardado && usuarioGuardado) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenGuardado}`;
      setUsuario(JSON.parse(usuarioGuardado));
    }

    setCargando(false);
  }, []);

  function iniciarSesion(usuarioData, token) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUsuario(usuarioData);
  }

  function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    delete api.defaults.headers.common['Authorization'];
    setUsuario(null);
  }

  const esAdmin = usuario?.rolId === 1;

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, cerrarSesion, esAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}