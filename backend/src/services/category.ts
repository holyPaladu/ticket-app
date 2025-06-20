import { prisma } from "../db";

// Get all categories
export const getCategories = async () => ({
  data: await prisma.category.findMany(),
});

// Get category by id
export const getCategory = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { products: true },
  });
  if (!category) throw { status: 404, message: "Category not found" };
  return { data: category };
};

// Create category
export const createCategory = async ({ body }: { body: { name: string } }) => {
  const category = await prisma.category.create({
    data: { name: body.name },
  });
  return { status: 201, data: category };
};

// Update category
export const updateCategory = async ({
  params: { id },
  body,
}: {
  params: { id: string };
  body: { name?: string };
}) => {
  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name: body.name },
  });
  return { data: category };
};

// Delete category
export const deleteCategory = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const category = await prisma.category.delete({
    where: { id: Number(id) },
  });
  return { message: "Category deleted", data: category };
};
