import api from './api';

async function listarTodas() {
  const { data } = await api.get('/categorias');
  return data.data;
}

async function crear(datos) {
  const { data } = await api.post('/categorias', datos);
  return data.data;
}

export default {
  listarTodas,
  crear,
};