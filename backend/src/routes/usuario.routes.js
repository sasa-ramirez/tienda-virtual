import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import usuarioValidator from '../validators/usuario.validator.js';
import manejarErroresValidacion from '../middlewares/validacion.middleware.js';

const router = Router();

router.post(
  '/registro',
  usuarioValidator.registrarValidator,
  manejarErroresValidacion,
  usuarioController.registrar
);

export default router;