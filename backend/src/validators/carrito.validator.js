import { body } from 'express-validator';

const agregarValidator = [
  body('productoId')
    .notEmpty().withMessage('El producto es obligatorio')
    .isInt().withMessage('El ID de producto debe ser un número entero'),

  body('cantidad')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
];

const actualizarValidator = [
  body('cantidad')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
];

export default {
  agregarValidator,
  actualizarValidator,
};