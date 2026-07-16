import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productoService from '../services/producto.service';
import favoritoService from '../services/favorito.service';
import { useAuth } from '../context/AuthContext';

function DetalleProducto() {
  const { id } = useParams();
  const { usuario } = useAuth();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    async function cargar() {
      setCargando(true);
      try {
        const data = await productoService.obtenerPorId(id);
        setProducto(data);

        if (usuario) {
          const favoritos = await favoritoService.listarPropios();
          setEsFavorito(favoritos.some((f) => f.productoId === Number(id)));
        }
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, [id, usuario]);

  async function manejarFavorito() {
    if (!usuario) return;

    try {
      if (esFavorito) {
        await favoritoService.eliminar(Number(id));
        setEsFavorito(false);
      } else {
        await favoritoService.agregar(Number(id));
        setEsFavorito(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (cargando) {
    return <p className="text-center py-16 text-texto-secundario">Cargando producto...</p>;
  }

  if (error || !producto) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">{error || 'Producto no encontrado'}</p>
        <Link to="/catalogo" className="text-acento hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/catalogo" className="text-sm text-texto-secundario hover:text-acento mb-6 inline-block">
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="h-80 sm:h-96 bg-acento-claro rounded-xl flex items-center justify-center text-texto-secundario">
          Sin imagen
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-texto-secundario mb-2">
            {producto.categoria.nombre}
          </p>
          <h1 className="font-display text-3xl text-texto mb-3">{producto.nombre}</h1>
          <p className="font-display text-2xl text-acento mb-6">
            ${Number(producto.precio).toLocaleString('es-CO')}
          </p>

          {producto.descripcion && (
            <p className="text-texto-secundario mb-6">{producto.descripcion}</p>
          )}

          {producto.marca && (
            <p className="text-sm text-texto-secundario mb-6">
              Marca: <span className="text-texto">{producto.marca}</span>
            </p>
          )}

          <p className="text-sm text-texto-secundario mb-6">
            {producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm text-texto">Cantidad</label>
            <input
              type="number"
              min="1"
              max={producto.stock}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-20 border border-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-acento"
            />
          </div>

          <div className="flex gap-3">
            <button
              disabled={producto.stock === 0}
              className="flex-1 bg-acento text-fondo py-3 rounded-lg text-sm font-medium hover:bg-acento-hover transition-colors disabled:opacity-50"
            >
              Agregar al carrito
            </button>

            {usuario && (
              <button
                onClick={manejarFavorito}
                className="w-12 h-12 border border-borde rounded-lg flex items-center justify-center text-xl hover:border-acento transition-colors"
                aria-label="Favorito"
              >
                {esFavorito ? '♥' : '♡'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;