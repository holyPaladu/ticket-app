import { prisma } from "../db";

// Получить все продукты
export const getProducts = async () => ({
  data: await prisma.product.findMany({ include: { category: true } }),
});

// Получить продукт по id
export const getProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });
  if (!product) throw { status: 404, message: "Product not found" };
  return { data: product };
};

// Создать продукт
export const createProduct = async ({
  body,
}: {
  body: { name: string; price: number; categoryId: number };
}) => {
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      categoryId: body.categoryId,
    },
  });
  return { status: 201, data: product };
};

// Обновить продукт
export const updateProduct = async ({
  params: { id },
  body,
}: {
  params: { id: string };
  body: { name?: string; price?: number; categoryId?: number };
}) => {
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      price: body.price,
      categoryId: body.categoryId,
    },
  });
  return { data: product };
};

// Удалить продукт
export const deleteProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await prisma.product.delete({
    where: { id: Number(id) },
  });
  return { message: "Product deleted", data: product };
};
