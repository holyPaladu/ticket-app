import { defineStore } from "pinia";
import type { User } from "./userModel";
import { ref } from "vue";
import * as userApi from "./userApi";

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
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

  return {
    users,
    loading,
    loadUsers,
    removeUser,
  };
});
