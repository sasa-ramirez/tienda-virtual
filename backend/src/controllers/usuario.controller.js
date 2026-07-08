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

async function login(req, res) {
  try {
    const resultado = await usuarioService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: resultado,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
      data: null,
    });
  }
}


async function perfil(req, res) {
  try {
    const usuario = await usuarioService.obtenerPerfil(req.usuario.id);

    res.status(200).json({
      success: true,
      message: 'Perfil obtenido exitosamente',
      data: usuario,
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
  login,
  perfil
};