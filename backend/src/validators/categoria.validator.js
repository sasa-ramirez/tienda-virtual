import { body } from 'express-validator';

const crearValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('descripcion')
    .optional()
    .trim(),
];

const actualizarValidator = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('descripcion')
    .optional()
    .trim(),
];

export default {
  crearValidator,
  actualizarValidator,
};