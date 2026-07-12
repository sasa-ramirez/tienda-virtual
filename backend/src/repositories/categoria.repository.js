import prisma from '../config/prisma.js';

async function crear(datos) {
  return prisma.categoria.create({ data: datos });
}

async function listarTodas() {
  return prisma.categoria.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' },
  });
}

async function buscarPorId(id) {
  return prisma.categoria.findUnique({ where: { id } });
}

async function buscarPorSlug(slug) {
  return prisma.categoria.findUnique({ where: { slug } });
}

async function actualizar(id, datos) {
  return prisma.categoria.update({
    where: { id },
    data: datos,
  });
}

async function eliminar(id) {
  return prisma.categoria.update({
    where: { id },
    data: { activo: false },
  });
}

export default {
  crear,
  listarTodas,
  buscarPorId,
  buscarPorSlug,
  actualizar,
  eliminar,
};