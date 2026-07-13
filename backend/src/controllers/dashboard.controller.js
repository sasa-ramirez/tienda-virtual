import dashboardService from '../services/dashboard.service.js';

async function obtenerResumen(req, res) {
  try {
    const resumen = await dashboardService.obtenerResumen();

    res.status(200).json({
      success: true,
      message: 'Resumen del dashboard obtenido exitosamente',
      data: resumen,
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
  obtenerResumen,
};