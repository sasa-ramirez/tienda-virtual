import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.jpeg';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="border-b border-borde bg-fondo sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Sarela Bags" className="h-12 w-12 rounded-full object-cover" />
          <span className="font-display text-xl text-texto hidden sm:block">Sarela Bags</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/catalogo?categoria=carteras" className="text-sm text-texto hover:text-acento transition-colors">
            Carteras
          </Link>
          <Link to="/catalogo?categoria=mochilas" className="text-sm text-texto hover:text-acento transition-colors">
            Mochilas
          </Link>
          <Link to="/catalogo?categoria=accesorios" className="text-sm text-texto hover:text-acento transition-colors">
            Accesorios
          </Link>
          <Link to="/login" className="text-sm text-texto hover:text-acento transition-colors">
            Iniciar sesión
          </Link>
          <Link
            to="/registro"
            className="text-sm bg-acento text-fondo px-4 py-2 rounded-lg hover:bg-acento-hover transition-colors"
          >
            Registrarse
          </Link>
        </nav>

        <button
          className="md:hidden text-texto"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuAbierto ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuAbierto && (
        <nav className="md:hidden border-t border-borde px-4 py-4 flex flex-col gap-4">
          <Link to="/catalogo?categoria=carteras" className="text-sm text-texto" onClick={() => setMenuAbierto(false)}>
            Carteras
          </Link>
          <Link to="/catalogo?categoria=mochilas" className="text-sm text-texto" onClick={() => setMenuAbierto(false)}>
            Mochilas
          </Link>
          <Link to="/catalogo?categoria=accesorios" className="text-sm text-texto" onClick={() => setMenuAbierto(false)}>
            Accesorios
          </Link>
          <Link to="/login" className="text-sm text-texto" onClick={() => setMenuAbierto(false)}>
            Iniciar sesión
          </Link>
          <Link
            to="/registro"
            className="text-sm bg-acento text-fondo px-4 py-2 rounded-lg text-center"
            onClick={() => setMenuAbierto(false)}
          >
            Registrarse
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;