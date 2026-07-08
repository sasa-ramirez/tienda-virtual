import bcrypt from 'bcrypt';
import usuarioRepository from '../repositories/usuario.repository.js';

const SALT_ROUNDS = 10;
const ROL_CLIENTE_ID = 2;

async function registrar({ nombre, apellido, correo, password, telefono }) {
  const usuarioExistente = await usuarioRepository.buscarPorCorreo(correo);

  if (usuarioExistente) {
    const error = new Error('Ya existe un usuario registrado con este correo');
    error.statusCode = 409;
    throw error;
  }

  const passwordEncriptada = await bcrypt.hash(password, SALT_ROUNDS);

  const nuevoUsuario = await usuarioRepository.crear({
    nombre,
    apellido,
    correo,
    telefono,
    password: passwordEncriptada,
    rolId: ROL_CLIENTE_ID,
  });

  const { password: _, ...usuarioSinPassword } = nuevoUsuario;

  return usuarioSinPassword;
}

export default {
  registrar,
};