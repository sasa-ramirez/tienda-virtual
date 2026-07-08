import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import usuarioValidator from '../validators/usuario.validator.js';
import manejarErroresValidacion from '../middlewares/validacion.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta para el registro de usuarios
router.post(
  '/registro',
  usuarioValidator.registrarValidator,
  manejarErroresValidacion,
  usuarioController.registrar
);

// Ruta para el inicio de sesión (Login)
router.post(
  '/login',
  usuarioValidator.loginValidator,
  manejarErroresValidacion,
  usuarioController.login
);

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/perfil', authMiddleware.verificarToken, usuarioController.perfil);

export default router;