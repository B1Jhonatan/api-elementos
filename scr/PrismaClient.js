import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connect = async () => {
  await prisma.$connect();
  console.log("Prisma conectado");
};

export const disconnect = async () => {
  await prisma.$disconnect();
  console.log("Prisma desconectado");
};

export default prisma;
