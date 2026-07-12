import categoriaService from '../services/categoria.service.js';

async function crear(req, res) {
  try {
    const categoria = await categoriaService.crear(req.body);

    res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: categoria,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function listarTodas(req, res) {
  try {
    const categorias = await categoriaService.listarTodas();

    res.status(200).json({
      success: true,
      message: 'Categorías obtenidas exitosamente',
      data: categorias,
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
    const categoria = await categoriaService.obtenerPorId(id);

    res.status(200).json({
      success: true,
      message: 'Categoría obtenida exitosamente',
      data: categoria,
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
    const categoria = await categoriaService.actualizar(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: categoria,
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
    await categoriaService.eliminar(id);

    res.status(200).json({
      success: true,
      message: 'Categoría eliminada exitosamente',
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

export default {
  crear,
  listarTodas,
  obtenerPorId,
  actualizar,
  eliminar,
};