import api from './api';

async function listarTodas() {
  const { data } = await api.get('/categorias');
  return data.data;
}

export default {
  listarTodas,
};