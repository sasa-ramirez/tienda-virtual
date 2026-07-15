import api from './api';

async function listarTodos(filtros = {}) {
  const { data } = await api.get('/productos', { params: filtros });
  return data.data;
}

async function obtenerPorId(id) {
  const { data } = await api.get(`/productos/${id}`);
  return data.data;
}

export default {
  listarTodos,
  obtenerPorId,
};