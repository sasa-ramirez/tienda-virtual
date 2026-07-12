import productoService from '../services/producto.service.js';

async function crear(req, res) {
  try {
    const producto = await productoService.crear(req.body);

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: producto,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function listarTodos(req, res) {
  try {
    const { categoriaId, busqueda } = req.query;

    const filtros = {
      categoriaId: categoriaId ? Number(categoriaId) : undefined,
      busqueda,
    };

    const productos = await productoService.listarTodos(filtros);

    res.status(200).json({
      success: true,
      message: 'Productos obtenidos exitosamente',
      data: productos,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function obtenerPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const producto = await productoService.obtenerPorId(id);

    res.status(200).json({
      success: true,
      message: 'Producto obtenido exitosamente',
      data: producto,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function actualizar(req, res) {
  try {
    const id = Number(req.params.id);
    const producto = await productoService.actualizar(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: producto,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function eliminar(req, res) {
  try {
    const id = Number(req.params.id);
    await productoService.eliminar(id);

    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: null,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function ajustarInventario(req, res) {
  try {
    const id = Number(req.params.id);
    const producto = await productoService.ajustarInventario(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Inventario ajustado exitosamente',
      data: producto,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

export default {
  crear,
  listarTodos,
  obtenerPorId,
  actualizar,
  eliminar,
  ajustarInventario,
};