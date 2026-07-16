import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  async function manejarSubmit(e) {
    e.preventDefault();
    setError('');
    setEnviando(true);

    try {
      const { usuario, token } = await authService.login(correo, password);
      iniciarSesion(usuario, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al iniciar sesión');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-display text-3xl text-texto mb-2">Iniciar Sesión</h1>
      <p className="text-texto-secundario mb-8">Bienvenido de nuevo a Sarela Bags</p>

      <form onSubmit={manejarSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-texto mb-1">Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento"
          />
        </div>

        <div>
          <label className="block text-sm text-texto mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-acento text-fondo py-2.5 rounded-lg text-sm font-medium hover:bg-acento-hover transition-colors disabled:opacity-50"
        >
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="text-sm text-texto-secundario mt-6 text-center">
        ¿No tienes cuenta?{' '}
        <Link to="/registro" className="text-acento hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}

export default Login;