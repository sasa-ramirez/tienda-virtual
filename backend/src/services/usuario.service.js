import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usuarioRepository from '../repositories/usuario.repository.js';

const SALT_ROUNDS = 10;
const ROL_CLIENTE_ID = 2;

/**
 * Registra un nuevo usuario en el sistema
 */
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

  // Extraemos la contraseña para no devolverla en la respuesta
  const { password: _, ...usuarioSinPassword } = nuevoUsuario;

  return usuarioSinPassword;
}

/**
 * Autentica un usuario y genera su token JWT
 */
async function login({ correo, password }) {
  const usuario = await usuarioRepository.buscarPorCorreo(correo);

  // Seguridad: Usamos el mismo mensaje si el usuario no existe o si la contraseña falla
  if (!usuario) {
    const error = new Error('Correo o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) {
    const error = new Error('Correo o contraseña incorrectos');
    error.statusCode = 401;
    throw error;
  }

  // Generamos el token con la información esencial en el payload
  const token = jwt.sign(
    { id: usuario.id, correo: usuario.correo, rolId: usuario.rolId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Por seguridad, un fallback si no está en el .env
  );

  const { password: _, ...usuarioSinPassword } = usuario;

  return { usuario: usuarioSinPassword, token };
}

export default {
  registrar,
  login,
};