import apiClient from "@/shared/api/apiClient";
import type { User } from "./userModel";

export async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get<{ data: User[] }>("/users");
  return response.data.data;
}
export async function fetchUserById(id: number): Promise<User> {
  const response = await apiClient.get<{ data: User }>(`/users/${id}
 `);
  return response.data.data;
}
export async function createUser(payload: Partial<User>): Promise<User> {
  const response = await apiClient.post<{ data: User }>("/users", payload);
  return response.data.data;
}
export async function updateUser(
  id: number,
  payload: Partial<User>
): Promise<User> {
  const response = await apiClient.patch<{ data: User }>(
    `/users/${id}`,
    payload
  );
  return response.data.data;
}
export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
