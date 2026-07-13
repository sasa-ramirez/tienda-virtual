import favoritoService from '../services/favorito.service.js';

async function agregar(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const productoId = Number(req.body.productoId);

    const favorito = await favoritoService.agregar(usuarioId, productoId);

    res.status(201).json({
      success: true,
      message: 'Producto agregado a favoritos',
      data: favorito,
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
    const usuarioId = req.usuario.id;
    const productoId = Number(req.params.productoId);

    await favoritoService.eliminar(usuarioId, productoId);

    res.status(200).json({
      success: true,
      message: 'Producto eliminado de favoritos',
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

async function listarPropios(req, res) {
  try {
    const usuarioId = req.usuario.id;
    const favoritos = await favoritoService.listarPorUsuario(usuarioId);

    res.status(200).json({
      success: true,
      message: 'Favoritos obtenidos exitosamente',
      data: favoritos,
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
  agregar,
  eliminar,
  listarPropios,
};