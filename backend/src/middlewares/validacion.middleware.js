import { validationResult } from 'express-validator';

function manejarErroresValidacion(req, res, next) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      data: errores.array().map((err) => ({
        campo: err.path,
        mensaje: err.msg,
      })),
    });
  }

  next();
}

export default manejarErroresValidacion;