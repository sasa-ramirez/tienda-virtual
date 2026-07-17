import carritoRepository from '../repositories/carrito.repository.js';
import productoService from './producto.service.js';

async function obtenerOCrear(usuarioId) {
  let carrito = await carritoRepository.buscarPorUsuario(usuarioId);

  if (!carrito) {
    await carritoRepository.crear(usuarioId);
    carrito = await carritoRepository.buscarPorUsuario(usuarioId);
  }

  return carrito;
}

function calcularTotal(carrito) {
  const subtotal = carrito.detalles.reduce(
    (total, detalle) => total + Number(detalle.precio) * detalle.cantidad,
    0
  );

  return { ...carrito, subtotal };
}

async function obtenerCarrito(usuarioId) {
  const carrito = await obtenerOCrear(usuarioId);
  return calcularTotal(carrito);
}

async function agregarProducto(usuarioId, productoId, cantidad) {
  const producto = await productoService.obtenerPorId(productoId);

  if (producto.stock < cantidad) {
    const error = new Error(`Solo quedan ${producto.stock} unidades disponibles`);
    error.statusCode = 409;
    throw error;
  }

  const carrito = await obtenerOCrear(usuarioId);
  const detalleExistente = await carritoRepository.buscarDetalle(carrito.id, productoId);

  if (detalleExistente) {
    const nuevaCantidad = detalleExistente.cantidad + cantidad;

    if (producto.stock < nuevaCantidad) {
      const error = new Error(`Solo quedan ${producto.stock} unidades disponibles`);
      error.statusCode = 409;
      throw error;
    }

    await carritoRepository.actualizarCantidadDetalle(detalleExistente.id, nuevaCantidad);
  } else {
    await carritoRepository.agregarDetalle(carrito.id, productoId, cantidad, producto.precio);
  }

  return obtenerCarrito(usuarioId);
}

async function actualizarCantidad(usuarioId, detalleId, cantidad) {
  if (cantidad < 1) {
    const error = new Error('La cantidad debe ser al menos 1');
    error.statusCode = 400;
    throw error;
  }

  await carritoRepository.actualizarCantidadDetalle(detalleId, cantidad);
  return obtenerCarrito(usuarioId);
}

async function eliminarProducto(usuarioId, detalleId) {
  await carritoRepository.eliminarDetalle(detalleId);
  return obtenerCarrito(usuarioId);
}

async function vaciar(usuarioId) {
  const carrito = await obtenerOCrear(usuarioId);
  await carritoRepository.vaciarCarrito(carrito.id);
  return obtenerCarrito(usuarioId);
}

export default {
  obtenerCarrito,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
  vaciar,
};