import prisma from '../config/prisma.js';

async function crear(datosUsuario) {
  return prisma.usuario.create({
    data: datosUsuario,
  });
}

async function buscarPorCorreo(correo) {
  return prisma.usuario.findUnique({
    where: { correo },
  });
}

async function buscarPorId(id) {
  return prisma.usuario.findUnique({
    where: { id },
    include: { rol: true },
  });
}

export default {
  crear,
  buscarPorCorreo,
  buscarPorId,
};