<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/entities/user/userStore";
import BaseTable from "@/shared/ui/Table.vue";
import BaseButton from "@/shared/ui/Button.vue";
import TextGroup from "@/shared/ui/TextGroup.vue";
import asideMenu from "@/features/aside/ui/asideMenu.vue";
import { useRouter } from "vue-router";
import type { User } from "@/entities/user/userModel";

const userStore = useUserStore();
const router = useRouter();

const users = ref<User[]>([]);
const show = ref<boolean>(false);

const onShow = async (id: number) => {
  show.value = true;
  await userStore.findUser(id);
};
const closeShow = () => {
  show.value = false;
};
const onDelete = async (id?: number) => {
  if (!id) return;
  if (confirm("Удалить пользователя?")) {
    await userStore.removeUser(id);
    await userStore.loadUsers();
    users.value = userStore.users;
    closeShow();
  }
};
const onEdit = (id?: number) => {
  if (!id) return;
  router.push({ name: "UserEdit", params: { id } });
  closeShow();
};
const onCreate = () => {
  router.push({ name: "UserCreate" });
  closeShow();
};

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
        color="primary"
        type="outline"
        class="px-8 py-2 rounded-sm"
      >
        Создать
      </BaseButton>
    </header>
    <BaseTable
      :items="users"
      :columns="userStore.columns.filter((i) => i.key !== 'password')"
      :loading="userStore.loading"
      @delete="onDelete"
      @edit="onEdit"
      @show="onShow"
    />
  </div>
  <teleport to="body">
    <asideMenu
      v-show="show"
      :id="userStore.user?.id"
      @close="closeShow"
      @delete="onDelete"
      @edit="onEdit"
    >
      <main class="flex flex-col gap-6">
        <template v-for="col in userStore.columns">
          <TextGroup :title="col.key" :value="userStore.user?.[col.key]" />
        </template>
      </main>
    </asideMenu>
  </teleport>
</template>

<style lang="css" scoped></style>
