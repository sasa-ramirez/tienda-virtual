function Footer() {
  return (
    <footer className="border-t border-borde mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-lg text-texto mb-2">Sarela Bags</p>
<p className="text-sm text-texto-secundario">
  Estilo que te define. Carteras, mochilas y accesorios artesanales.
</p>
          </div>
          <div>
            <p className="text-sm font-medium text-texto mb-3">Ayuda</p>
            <ul className="space-y-2 text-sm text-texto-secundario">
              <li>Envíos</li>
              <li>Devoluciones</li>
              <li>Contacto</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-texto mb-3">Empresa</p>
            <ul className="space-y-2 text-sm text-texto-secundario">
              <li>Sobre nosotros</li>
              <li>Términos y condiciones</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-texto-secundario mt-8 pt-8 border-t border-borde">
         © 2026 Sarela Bags. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;