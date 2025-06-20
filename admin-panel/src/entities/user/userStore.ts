import { defineStore } from "pinia";
import type { User } from "./userModel";
import { ref } from "vue";
import * as userApi from "./userApi";

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);

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

  return {
    users,
    user,
    loading,
    loadUsers,
    removeUser,
    findUser,
    deleteUser,
  };
});
