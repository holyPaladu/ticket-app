<script lang="ts" setup>
import { reactive } from "vue";
import { useProductStore } from "@/entities/product/productStore";
import { capitalize } from "@/shared/utils/capitalize";
import BaseButton from "@/shared/ui/Button.vue";
import BaseInput from "@/shared/ui/Input.vue";
import BaseSelect from "@/shared/ui/Select.vue";
import router from "@/router";

const productStore = useProductStore();
const formData = reactive<Record<string, string>>({});
// Инициализируем значения
for (const col of productStore.columns) {
  if (col.key !== "id") {
    formData[col.key] = "";
  }
}
async function createUser() {
  try {
    await productStore.create?.(formData);
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
      <template v-for="col in productStore.columns" :key="String(col.key)">
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
