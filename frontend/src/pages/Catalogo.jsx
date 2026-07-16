import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productoService from '../services/producto.service';
import categoriaService from '../services/categoria.service';

function Catalogo() {
  const [searchParams] = useSearchParams();
  const categoriaSlug = searchParams.get('categoria');

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);
      try {
        const todasCategorias = await categoriaService.listarTodas();
        setCategorias(todasCategorias);

        const filtros = {};

        if (categoriaSlug) {
          const categoriaEncontrada = todasCategorias.find(
            (cat) => cat.slug === categoriaSlug
          );
          if (categoriaEncontrada) {
            filtros.categoriaId = categoriaEncontrada.id;
          }
        }

        const data = await productoService.listarTodos(filtros);
        setProductos(data);
      } catch (err) {
        setError('No se pudieron cargar los productos');
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, [categoriaSlug]);

  if (cargando) {
    return <p className="text-center py-16 text-texto-secundario">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center py-16 text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl text-texto mb-2">
        {categoriaSlug
          ? categorias.find((c) => c.slug === categoriaSlug)?.nombre || 'Catálogo'
          : 'Catálogo'}
      </h1>
      <p className="text-texto-secundario mb-8">
        {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
      </p>

      {productos.length === 0 ? (
        <p className="text-texto-secundario">Todavía no hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="group bg-white border border-borde rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="h-52 bg-acento-claro flex items-center justify-center text-texto-secundario text-sm relative overflow-hidden">
                Sin imagen
                <button
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Agregar a favoritos"
                  onClick={(e) => e.stopPropagation()}
                >
                  ♡
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-texto-secundario mb-1">
                  {producto.categoria.nombre}
                </p>
                <p className="text-sm text-texto font-medium mb-2">{producto.nombre}</p>
                <p className="font-display text-lg text-acento">
                  ${Number(producto.precio).toLocaleString('es-CO')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;