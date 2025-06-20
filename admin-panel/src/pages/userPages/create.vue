<script lang="ts" setup>
import { reactive } from "vue";
import { useUserStore } from "@/entities/user/userStore";
import BaseButton from "@/shared/ui/Button.vue";
import BaseInput from "@/shared/ui/Input.vue";
import BaseSelect from "@/shared/ui/Select.vue";
import router from "@/router";

const userStore = useUserStore();
const formData = reactive<Record<string, string>>({});
// Инициализируем значения
for (const col of userStore.columns) {
  if (col.key !== "id") {
    formData[col.key] = "";
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
async function createUser() {
  try {
    await userStore.createUser?.(formData);
    router.push({ name: "Users" });
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <h2 class="font-semibold text-3xl">Создать новый</h2>

    <form
      @submit.prevent="createUser"
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
          v-else-if="col.key !== 'id'"
        />
      </template>
      <BaseButton color="primary" type="filled" class="px-8 py-2 rounded-lg">
        Сохранить
      </BaseButton>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
