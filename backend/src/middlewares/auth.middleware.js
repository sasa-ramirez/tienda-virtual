import jwt from 'jsonwebtoken';

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No se proporcionó un token de autenticación',
      data: null,
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      data: null,
    });
  }
}

function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rolId)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para realizar esta acción',
        data: null,
      });
    }
    next();
  };
}

export default {
  verificarToken,
  verificarRol,
};