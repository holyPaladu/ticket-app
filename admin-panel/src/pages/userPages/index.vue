<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/entities/user/userStore";
import BaseTable from "@/shared/ui/Table.vue";
import BaseButton from "@/shared/ui/Button.vue";
import { useRouter } from "vue-router";
import type { User } from "@/entities/user/userModel";

const userStore = useUserStore();
const router = useRouter();

const users = ref<User[]>([]);

function onDelete(id: number) {
  if (confirm("Удалить пользователя?")) {
    userStore.removeUser(id);
  }
}
function onCreate() {
  router.push({ name: "UserCreate" });
}

onMounted(async () => {
  await userStore.loadUsers();
  users.value = userStore.users;
});
</script>

<template>
  <div class="p-4 flex flex-col gap-8">
    <header class="flex justify-between">
      <h1 class="text-3xl">Пользователи</h1>
      <BaseButton
        @click="onCreate"
        text="Создать"
        color="primary"
        type="outline"
        class="px-8 py-2 rounded-sm"
      />
    </header>
    <BaseTable
      :tables="users"
      :loading="userStore.loading"
      @delete="onDelete"
    />
  </div>
</template>

<style lang="css" scoped></style>
