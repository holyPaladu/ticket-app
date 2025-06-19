<script lang="ts" setup>
import { onMounted } from "vue";
import { useUserStore } from "@/entities/user/userStore";
import UserTable from "@/widgets/UserTable/ui/userTable.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const users = userStore.users;
const loading = userStore.loading;

function onDelete(id: number) {
  if (confirm("Удалить пользователя?")) {
    userStore.removeUser(id);
  }
}
function onCreate() {
  router.push({ name: "UserCreate" });
  10;
}

onMounted(() => {
  userStore.loadUsers();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl mb-4">Пользователи</h1>
    <button @click="onCreate" class="mb-2">Создать пользователя</button>
    <UserTable :users="users" :loading="loading" @delete="onDelete" />
    <!-- Модалка для создания/редактирования можно вынести как widget -->
  </div>
</template>

<style lang="css" scoped></style>
