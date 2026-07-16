import api from './api';

async function listarPropios() {
  const { data } = await api.get('/favoritos');
  return data.data;
}

async function agregar(productoId) {
  const { data } = await api.post('/favoritos', { productoId });
  return data.data;
}

async function eliminar(productoId) {
  await api.delete(`/favoritos/${productoId}`);
}

export default {
  listarPropios,
  agregar,
  eliminar,
};