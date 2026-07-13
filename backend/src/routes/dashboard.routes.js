import { Router } from 'express';
import dashboardController from '../controllers/dashboard.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

const ROL_ADMIN = 1;

router.get(
  '/resumen',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  dashboardController.obtenerResumen
);

export default router;