import { useState, useEffect } from 'react';
import productoService from '../../services/producto.service';
import categoriaService from '../../services/categoria.service';

function CrearProducto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [marca, setMarca] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function cargarDatos() {
    const [cats, prods] = await Promise.all([
      categoriaService.listarTodas(),
      productoService.listarTodos(),
    ]);
    setCategorias(cats);
    setProductos(prods);
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function manejarSubmit(e) {
    e.preventDefault();
    setError('');
    setMensaje('');
    setEnviando(true);

    try {
      await productoService.crear({
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
        marca,
        categoriaId: Number(categoriaId),
      });

      setMensaje(`Producto "${nombre}" creado exitosamente`);
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setStock('');
      setMarca('');
      setCategoriaId('');
      cargarDatos();
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al crear el producto');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-texto mb-6">Productos</h2>

      <form onSubmit={manejarSubmit} className="space-y-4 mb-10 max-w-md">
        <div>
          <label className="block text-sm text-texto mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej: Cartera Boho Beige"
            className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento"
          />
        </div>

        <div>
          <label className="block text-sm text-texto mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-texto mb-1">Precio</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="1"
              step="1"
              placeholder="120000"
              className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento"
            />
          </div>

          <div>
            <label className="block text-sm text-texto mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
              placeholder="10"
              className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-texto mb-1">Marca</label>
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            placeholder="Sarela Bags"
            className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento"
          />
        </div>

        <div>
          <label className="block text-sm text-texto mb-1">Categoría</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className="w-full border border-borde rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-acento bg-white"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {mensaje && <p className="text-green-700 text-sm">{mensaje}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="bg-acento text-fondo px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-acento-hover transition-colors disabled:opacity-50"
        >
          {enviando ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>

      <h3 className="text-sm font-medium text-texto mb-3">Productos existentes ({productos.length})</h3>
      <div className="space-y-2">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center justify-between border border-borde rounded-lg px-4 py-3"
          >
            <div>
              <p className="text-sm text-texto font-medium">{prod.nombre}</p>
              <p className="text-xs text-texto-secundario">
                {prod.categoria.nombre} · Stock: {prod.stock}
              </p>
            </div>
            <p className="font-display text-acento">
              ${Number(prod.precio).toLocaleString('es-CO')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrearProducto;