import usuarioService from '../services/usuario.service.js';

async function registrar(req, res) {
  try {
    const nuevoUsuario = await usuarioService.registrar(req.body);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: nuevoUsuario,
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
  registrar,
};