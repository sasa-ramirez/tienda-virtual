import prisma from '../config/prisma.js';

const STOCK_BAJO_LIMITE = 10;

async function obtenerResumen() {
  const [
    totalProductos,
    totalCategorias,
    totalUsuarios,
    productosStockBajo,
    totalPedidos,
  ] = await Promise.all([
    prisma.producto.count({ where: { activo: true } }),
    prisma.categoria.count({ where: { activo: true } }),
    prisma.usuario.count({ where: { estado: true } }),
    prisma.producto.count({
      where: { activo: true, stock: { lt: STOCK_BAJO_LIMITE } },
    }),
    prisma.pedido.count(),
  ]);

  return {
    totalProductos,
    totalCategorias,
    totalUsuarios,
    productosStockBajo,
    totalPedidos,
  };
}

export default {
  obtenerResumen,
};