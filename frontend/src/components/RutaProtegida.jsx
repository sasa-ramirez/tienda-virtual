import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, cargando, esAdmin } = useAuth();

  if (cargando) {
    return <p className="text-center py-16 text-texto-secundario">Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;