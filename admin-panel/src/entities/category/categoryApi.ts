import apiClient from "@/shared/api/apiClient";
import type { Category, CategoryData } from "./categoryModel";

export async function fetchAll(): Promise<Category[]> {
  const response = await apiClient.get<{ data: Category[] }>("/categories");
  return response.data.data;
}
export async function fetchById(id: number): Promise<CategoryData> {
  const response = await apiClient.get<{
    data: CategoryData;
  }>(`/categories/${id}
 `);
  return response.data.data;
}
export async function create(payload: Partial<Category>): Promise<Category> {
  const response = await apiClient.post<{ data: Category }>(
    "/categories",
    payload
  );
  return response.data.data;
}
export async function update(
  id: number,
  payload: Partial<Category>
): Promise<Category> {
  const response = await apiClient.patch<{ data: Category }>(
    `/categories/${id}`,
    payload
  );
  return response.data.data;
}
export async function Delete(id: number): Promise<void> {
  await apiClient.delete(`/categories/${id}`);
}
