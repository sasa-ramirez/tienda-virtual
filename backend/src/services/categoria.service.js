import categoriaRepository from '../repositories/categoria.repository.js';

function generarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function crear({ nombre, descripcion }) {
  const slug = generarSlug(nombre);

  const categoriaExistente = await categoriaRepository.buscarPorSlug(slug);

  if (categoriaExistente) {
    const error = new Error('Ya existe una categoría con un nombre muy similar');
    error.statusCode = 409;
    throw error;
  }

  return categoriaRepository.crear({ nombre, descripcion, slug });
}

async function listarTodas() {
  return categoriaRepository.listarTodas();
}

async function obtenerPorId(id) {
  const categoria = await categoriaRepository.buscarPorId(id);

  if (!categoria) {
    const error = new Error('Categoría no encontrada');
    error.statusCode = 404;
    throw error;
  }

  return categoria;
}

async function actualizar(id, { nombre, descripcion }) {
  await obtenerPorId(id);

  const datosActualizar = { descripcion };

  if (nombre) {
    datosActualizar.nombre = nombre;
    datosActualizar.slug = generarSlug(nombre);
  }

  return categoriaRepository.actualizar(id, datosActualizar);
}

async function eliminar(id) {
  await obtenerPorId(id);
  return categoriaRepository.eliminar(id);
}

export default {
  crear,
  listarTodas,
  obtenerPorId,
  actualizar,
  eliminar,
};