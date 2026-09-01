import { prisma } from "./client.js";

const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const findUserByIdPublic = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (name: string, email: string, password: string) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

const updateUserPassword = async (id: number, newPassword: string) => {
  return await prisma.user.update({
    where: { id },
    data: { password: newPassword },
  });
};

const updateUserName = async (id: number, name: string) => {
  return await prisma.user.update({
    where: { id },
    data: { name },
  });
};

export {
  findUserById,
  findUserByIdPublic,
  findUserByEmail,
  createUser,
  updateUserPassword,
  updateUserName,
};
