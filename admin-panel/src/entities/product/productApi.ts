import apiClient from "@/shared/api/apiClient";
import type { Product, ProductData } from "./productModel";

export async function fetchAll(): Promise<ProductData[]> {
  const response = await apiClient.get<{ data: ProductData[] }>("/products");
  return response.data.data;
}
export async function fetchById(id: number): Promise<ProductData> {
  const response = await apiClient.get<{ data: ProductData }>(`/products/${id}
 `);
  return response.data.data;
}
export async function create(payload: Partial<Product>): Promise<Product> {
  const response = await apiClient.post<{ data: Product }>(
    "/products",
    payload
  );
  return response.data.data;
}
export async function update(
  id: number,
  payload: Partial<Product>
): Promise<Product> {
  const response = await apiClient.patch<{ data: Product }>(
    `/products/${id}`,
    payload
  );
  return response.data.data;
}
export async function Delete(id: number): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
