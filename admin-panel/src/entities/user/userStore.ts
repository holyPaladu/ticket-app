import { defineStore } from "pinia";
import type { User, ColumnDefinition } from "./userModel";
import { ref } from "vue";
import * as userApi from "./userApi";

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);

  const columns = ref<ColumnDefinition<User>[]>([
    { key: "id", type: "number", disabled: true },
    { key: "name", type: "text" },
    { key: "email", type: "email" },
    { key: "password", type: "password" },
    { key: "role", type: "select", options: ["admin", "user"] },
  ]);

  async function loadUsers(): Promise<void> {
    loading.value = true;
    try {
      users.value = await userApi.fetchUsers();
    } finally {
      loading.value = false;
    }
  }
  async function removeUser(id: number): Promise<void> {
    await userApi.deleteUser(id);
    users.value = users.value.filter((u) => u.id === id);
  }
  async function findUser(id: number): Promise<void> {
    user.value = await userApi.fetchUserById(id);
  }
  async function deleteUser(id: number): Promise<void> {
    await userApi.deleteUser(id);
  }
  async function createUser(payload: Record<string, string>) {
    const user = await userApi.createUser(payload);
    users.value.push(user);
  }
  async function updateUser(id: number, payload: Record<string, string>) {
    const user = await userApi.updateUser(id, payload);
    users.value.push(user);
  }

  return {
    users,
    user,
    loading,
    columns,
    loadUsers,
    removeUser,
    findUser,
    deleteUser,
    createUser,
    updateUser,
  };
});
