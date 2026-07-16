import api from './api';

async function login(correo, password) {
  const { data } = await api.post('/usuarios/login', { correo, password });
  return data.data;
}

async function registrar(datosUsuario) {
  const { data } = await api.post('/usuarios/registro', datosUsuario);
  return data.data;
}

export default {
  login,
  registrar,
};