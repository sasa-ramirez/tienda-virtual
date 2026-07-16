import { useState, useEffect } from 'react';
import categoriaService from '../../services/categoria.service';

function CrearCategoria() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function cargarCategorias() {
    const data = await categoriaService.listarTodas();
    setCategorias(data);
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  async function manejarSubmit(e) {
    e.preventDefault();
    setError('');
    setMensaje('');
    setEnviando(true);

    try {
      await categoriaService.crear({ nombre, descripcion });
      setMensaje(`Categoría "${nombre}" creada exitosamente`);
      setNombre('');
      setDescripcion('');
      cargarCategorias();
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al crear la categoría');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl text-texto mb-6">Categorías</h2>

      <form onSubmit={manejarSubmit} className="space-y-4 mb-10 max-w-md">
        <div>
          <label className="block text-sm text-texto mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej: Carteras"
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

        {mensaje && <p className="text-green-700 text-sm">{mensaje}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="bg-acento text-fondo px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-acento-hover transition-colors disabled:opacity-50"
        >
          {enviando ? 'Creando...' : 'Crear Categoría'}
        </button>
      </form>

      <h3 className="text-sm font-medium text-texto mb-3">Categorías existentes ({categorias.length})</h3>
      <div className="space-y-2">
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between border border-borde rounded-lg px-4 py-3"
          >
            <div>
              <p className="text-sm text-texto font-medium">{cat.nombre}</p>
              <p className="text-xs text-texto-secundario">/{cat.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrearCategoria;