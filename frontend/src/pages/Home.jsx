function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs uppercase tracking-wide text-texto-secundario mb-3">Sarela Bags</p>
      <h1 className="font-display text-4xl sm:text-5xl text-texto mb-4 max-w-xl">
        Estilo que te define
      </h1>
      <p className="text-texto-secundario max-w-md mb-6">
        Carteras, mochilas y accesorios artesanales, hechos para acompañar tu historia.
      </p>
      <button className="bg-acento text-fondo px-6 py-3 rounded-lg text-sm font-medium hover:bg-acento-hover transition-colors">
        Ver catálogo
      </button>
    </div>
  );
}

export default Home;