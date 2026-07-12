import prisma from '../config/prisma.js';

async function crear(datos) {
  return prisma.producto.create({
    data: datos,
    include: { categoria: true, imagenes: true },
  });
}

async function listarTodos({ categoriaId, busqueda } = {}) {
  return prisma.producto.findMany({
    where: {
      activo: true,
      ...(categoriaId && { categoriaId }),
      ...(busqueda && {
        nombre: { contains: busqueda, mode: 'insensitive' },
      }),
    },
    include: { categoria: true, imagenes: true },
    orderBy: { fechaCreacion: 'desc' },
  });
}

async function buscarPorId(id) {
  return prisma.producto.findUnique({
    where: { id },
    include: { categoria: true, imagenes: true },
  });
}

async function actualizar(id, datos) {
  return prisma.producto.update({
    where: { id },
    data: datos,
    include: { categoria: true, imagenes: true },
  });
}

async function eliminar(id) {
  return prisma.producto.update({
    where: { id },
    data: { activo: false },
  });
}

async function actualizarStock(id, cantidad) {
  return prisma.producto.update({
    where: { id },
    data: { stock: { increment: cantidad } },
  });
}

export default {
  crear,
  listarTodos,
  buscarPorId,
  actualizar,
  eliminar,
  actualizarStock,
};