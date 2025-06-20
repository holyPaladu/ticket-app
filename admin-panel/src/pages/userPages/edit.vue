<script lang="ts" setup>
import { useUserStore } from "@/entities/user/userStore";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { capitalize } from "@/shared/utils/capitalize";
import BaseButton from "@/shared/ui/Button.vue";
import BaseInput from "@/shared/ui/Input.vue";
import BaseSelect from "@/shared/ui/Select.vue";

const { id } = useRoute().params;
const router = useRouter();
const userStore = useUserStore();
const formData = reactive<Record<string, string>>({});

const updateUser = async () => {
  try {
    if (!id) return;
    await userStore.updateUser(Number(id), formData);
    router.push({ name: "Users" });
  } catch (e) {
    console.error(e);
  }
};

onMounted(async () => {
  await userStore.findUser(Number(id));
  if (userStore.user) {
    const exclude = ["id", "password"];
    for (const col of userStore.columns) {
      if (!exclude.includes(col.key)) {
        const value = userStore.user[col.key];
        formData[col.key] =
          value !== undefined && value !== null ? String(value) : "";
      }
    }
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <h2 class="font-semibold text-3xl">Обновить пользователя</h2>
    <form
      @submit.prevent="updateUser"
      class="w-full p-8 rounded-lg shadow-xl bg-white flex flex-col items-center gap-3"
    >
      <template v-for="col in userStore.columns" :key="String(col.key)">
        <BaseSelect
          :label="capitalize(col.key)"
          :disabled="col.disabled"
          :options="col.options"
          v-model="formData[col.key]"
          v-if="col.type === 'select'"
        />
        <BaseInput
          type="text"
          :label="capitalize(col.key)"
          :disabled="col.disabled"
          :required="true"
          v-model="formData[col.key]"
          v-else-if="col.key !== 'id' && col.key !== 'password'"
        />
      </template>
      <BaseButton color="primary" type="filled" class="px-8 py-2 rounded-lg">
        Сохранить
      </BaseButton>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
