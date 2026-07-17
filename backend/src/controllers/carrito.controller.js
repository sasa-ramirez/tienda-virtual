import carritoService from '../services/carrito.service.js';

async function obtener(req, res) {
  try {
    const carrito = await carritoService.obtenerCarrito(req.usuario.id);

    res.status(200).json({
      success: true,
      message: 'Carrito obtenido exitosamente',
      data: carrito,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function agregar(req, res) {
  try {
    const { productoId, cantidad } = req.body;
    const carrito = await carritoService.agregarProducto(
      req.usuario.id,
      Number(productoId),
      Number(cantidad)
    );

    res.status(200).json({
      success: true,
      message: 'Producto agregado al carrito',
      data: carrito,
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
    const detalleId = Number(req.params.detalleId);
    const { cantidad } = req.body;

    const carrito = await carritoService.actualizarCantidad(
      req.usuario.id,
      detalleId,
      Number(cantidad)
    );

    res.status(200).json({
      success: true,
      message: 'Cantidad actualizada',
      data: carrito,
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
    const detalleId = Number(req.params.detalleId);
    const carrito = await carritoService.eliminarProducto(req.usuario.id, detalleId);

    res.status(200).json({
      success: true,
      message: 'Producto eliminado del carrito',
      data: carrito,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}

async function vaciar(req, res) {
  try {
    const carrito = await carritoService.vaciar(req.usuario.id);

    res.status(200).json({
      success: true,
      message: 'Carrito vaciado',
      data: carrito,
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
  obtener,
  agregar,
  actualizar,
  eliminar,
  vaciar,
};