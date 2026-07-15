import { useState, useEffect } from 'react';
import productoService from '../services/producto.service';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await productoService.listarTodos();
        setProductos(data);
      } catch (err) {
        setError('No se pudieron cargar los productos');
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  if (cargando) {
    return <p className="text-center py-16 text-texto-secundario">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center py-16 text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl text-texto mb-8">Catálogo</h1>

      {productos.length === 0 ? (
        <p className="text-texto-secundario">Todavía no hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white border border-borde rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-acento-claro flex items-center justify-center text-texto-secundario text-sm">
                Sin imagen
              </div>
              <div className="p-4">
                <p className="text-xs uppercase text-texto-secundario mb-1">
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