import productoRepository from '../repositories/producto.repository.js';
import categoriaService from './categoria.service.js';
import prisma from '../config/prisma.js';

async function crear(datosProducto) {
  await categoriaService.obtenerPorId(datosProducto.categoriaId);

  const producto = await productoRepository.crear(datosProducto);

  if (producto.stock > 0) {
    await prisma.movimientoInventario.create({
      data: {
        productoId: producto.id,
        tipo: 'ENTRADA',
        cantidad: producto.stock,
        motivo: 'Stock inicial al crear el producto',
      },
    });
  }

  return producto;
}

async function listarTodos(filtros) {
  return productoRepository.listarTodos(filtros);
}

async function obtenerPorId(id) {
  const producto = await productoRepository.buscarPorId(id);

  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.statusCode = 404;
    throw error;
  }

  return producto;
}

async function actualizar(id, datos) {
  await obtenerPorId(id);

  if (datos.categoriaId) {
    await categoriaService.obtenerPorId(datos.categoriaId);
  }

  return productoRepository.actualizar(id, datos);
}

async function eliminar(id) {
  await obtenerPorId(id);
  return productoRepository.eliminar(id);
}

async function ajustarInventario(id, { cantidad, tipo, motivo }) {
  await obtenerPorId(id);

  const cantidadFinal = tipo === 'SALIDA' ? -Math.abs(cantidad) : Math.abs(cantidad);

  await productoRepository.actualizarStock(id, cantidadFinal);

  await prisma.movimientoInventario.create({
    data: {
      productoId: id,
      tipo,
      cantidad: Math.abs(cantidad),
      motivo,
    },
  });

  return obtenerPorId(id);
}

export default {
  crear,
  listarTodos,
  obtenerPorId,
  actualizar,
  eliminar,
  ajustarInventario,
};