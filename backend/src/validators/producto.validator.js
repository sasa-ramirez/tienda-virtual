import { body } from 'express-validator';

const crearValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('descripcion')
    .optional()
    .trim(),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número mayor a 0'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('marca')
    .optional()
    .trim(),

  body('categoriaId')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isInt().withMessage('El ID de categoría debe ser un número entero'),
];

const actualizarValidator = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('precio')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número mayor a 0'),

  body('categoriaId')
    .optional()
    .isInt().withMessage('El ID de categoría debe ser un número entero'),
];

const ajustarInventarioValidator = [
  body('cantidad')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),

  body('tipo')
    .notEmpty().withMessage('El tipo de movimiento es obligatorio')
    .isIn(['ENTRADA', 'SALIDA']).withMessage('El tipo debe ser ENTRADA o SALIDA'),

  body('motivo')
    .trim()
    .notEmpty().withMessage('El motivo del movimiento es obligatorio'),
];

export default {
  crearValidator,
  actualizarValidator,
  ajustarInventarioValidator,
};