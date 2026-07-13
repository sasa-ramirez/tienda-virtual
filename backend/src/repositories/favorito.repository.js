import prisma from '../config/prisma.js';

async function agregar(usuarioId, productoId) {
  return prisma.favorito.create({
    data: { usuarioId, productoId },
  });
}

async function eliminar(usuarioId, productoId) {
  return prisma.favorito.deleteMany({
    where: { usuarioId, productoId },
  });
}

async function buscar(usuarioId, productoId) {
  return prisma.favorito.findUnique({
    where: {
      usuarioId_productoId: { usuarioId, productoId },
    },
  });
}

async function listarPorUsuario(usuarioId) {
  return prisma.favorito.findMany({
    where: { usuarioId },
    include: { producto: { include: { categoria: true, imagenes: true } } },
  });
}

export default {
  agregar,
  eliminar,
  buscar,
  listarPorUsuario,
};