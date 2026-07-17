import prisma from '../config/prisma.js';

async function buscarPorUsuario(usuarioId) {
  return prisma.carrito.findUnique({
    where: { usuarioId },
    include: {
      detalles: {
        include: {
          producto: { include: { categoria: true, imagenes: true } },
        },
      },
    },
  });
}

async function crear(usuarioId) {
  return prisma.carrito.create({
    data: { usuarioId },
  });
}

async function buscarDetalle(carritoId, productoId) {
  return prisma.detalleCarrito.findFirst({
    where: { carritoId, productoId },
  });
}

async function agregarDetalle(carritoId, productoId, cantidad, precio) {
  return prisma.detalleCarrito.create({
    data: { carritoId, productoId, cantidad, precio },
  });
}

async function actualizarCantidadDetalle(detalleId, cantidad) {
  return prisma.detalleCarrito.update({
    where: { id: detalleId },
    data: { cantidad },
  });
}

async function eliminarDetalle(detalleId) {
  return prisma.detalleCarrito.delete({
    where: { id: detalleId },
  });
}

async function vaciarCarrito(carritoId) {
  return prisma.detalleCarrito.deleteMany({
    where: { carritoId },
  });
}

export default {
  buscarPorUsuario,
  crear,
  buscarDetalle,
  agregarDetalle,
  actualizarCantidadDetalle,
  eliminarDetalle,
  vaciarCarrito,
};