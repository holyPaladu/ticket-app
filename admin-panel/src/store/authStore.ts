import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "@/entities/user/userModel";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string>("");
  const user = ref<User | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  function setToken(auth_token: string) {
    token.value = auth_token;
    localStorage.setItem("auth_token", token.value);
  }
  function setUser(payload: User) {
    user.value = payload;
  }
  function loadFromStorage() {
    const local_token = localStorage.getItem("auth_token");
    if (local_token) {
      token.value = local_token;
    }
  }
  function clear() {
    token.value = "";
    user.value = null;
    localStorage.removeItem("auth_token");
  }

  return {
    token,
    user,
    isAuthenticated,
    setToken,
    setUser,
    loadFromStorage,
    clear,
  };
});
