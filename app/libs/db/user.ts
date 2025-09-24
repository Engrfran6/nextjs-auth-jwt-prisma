import { prisma } from "./prisma";

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return await prisma.user.create({
    data,
    select: { id: true },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
