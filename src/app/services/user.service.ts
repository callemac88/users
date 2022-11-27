import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const findAllUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
};

export const createUser = async (user) => {
  const obj = await prisma.users.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  });
  return obj;
};

export const findOne = async (id) => {
  const user = await prisma.users.findFirst({
    where: { id },
  });
  return user;
};

export const updateUser = async (user) => {
  const users = await prisma.users.update({
    where: { id: Number(user.id) },
    data: user,
  });
  return users;
};

export const deleteUser = async (id) => {
  const users = await prisma.users.delete({
    where: { id },
  });
  return users;
};
