import { prisma } from "../db";
import { parseUserId } from "../utils/parseParams";

export const getUsers = async () => ({
  data: await prisma.user.findMany(),
});

export const createUser = async ({
  body,
}: {
  body: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "admin";
  };
}) => {
  const { name, email, password, role = "user" } = body;

  // Проверка на уникальность email (опционально)
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw { status: 409, message: "Email already exists" };

  const user = await prisma.user.create({
    data: { name, email, password, role },
  });

  return { status: 201, message: "User created", data: user };
};

export const findUser = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const user = await prisma.user.findUnique({ where: { id: parseUserId(id) } });
  if (!user) throw { status: 404, message: "User not found" };
  return { status: 200, data: user };
};

export const deleteUser = async ({
  params: { id },
}: {
  params: { id: string };
}) => ({
  message: "User deleted",
  data: await prisma.user.delete({ where: { id: parseUserId(id) } }),
});

export const updateUser = async ({
  params: { id },
  body,
}: {
  params: { id: string };
  body: { name?: string; email?: string; role?: "user" | "admin" };
}) => {
  // Исключаем password из body на всякий случай
  const { name, email, role } = body;
  const user = await prisma.user.update({
    where: { id: parseUserId(id) },
    data: { name, email, role },
  });
  return { status: 200, message: "User updated", data: user };
};
