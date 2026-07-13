import favoritoRepository from '../repositories/favorito.repository.js';
import productoService from './producto.service.js';

async function agregar(usuarioId, productoId) {
  await productoService.obtenerPorId(productoId);

  const yaExiste = await favoritoRepository.buscar(usuarioId, productoId);

  if (yaExiste) {
    const error = new Error('Este producto ya está en tus favoritos');
    error.statusCode = 409;
    throw error;
  }

  return favoritoRepository.agregar(usuarioId, productoId);
}

async function eliminar(usuarioId, productoId) {
  const favorito = await favoritoRepository.buscar(usuarioId, productoId);

  if (!favorito) {
    const error = new Error('Este producto no está en tus favoritos');
    error.statusCode = 404;
    throw error;
  }

  return favoritoRepository.eliminar(usuarioId, productoId);
}

async function listarPorUsuario(usuarioId) {
  return favoritoRepository.listarPorUsuario(usuarioId);
}

export default {
  agregar,
  eliminar,
  listarPorUsuario,
};