<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { useProductStore } from "@/entities/product/productStore";
import { useCategoryStore } from "@/entities/category/categoryStore";
import { capitalize } from "@/shared/utils/capitalize";
import BaseButton from "@/shared/ui/Button.vue";
import BaseInput from "@/shared/ui/Input.vue";
import BaseSelect from "@/shared/ui/Select.vue";
import router from "@/router";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const formData = reactive<Record<string, any>>({});
// Инициализируем значения
for (const col of productStore.columns) {
  if (col.key !== "id" && col.key !== "category") {
    if (col.type === "number" || col.type === "select") {
      formData[col.key] = null;
    } else {
      formData[col.key] = "";
    }
  }
}
async function createUser() {
  try {
    await productStore.create?.(formData);
    router.push({ name: "Products" });
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.load();
  }
  const exist = productStore.columns.find((u) => u.key === "categoryId");
  exist &&
    (exist.options = categoryStore.categories.map((c) => ({
      label: c.name,
      value: c.id,
    })));
});
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
          :type="col.type"
          :label="capitalize(col.key)"
          :disabled="col.disabled"
          :required="true"
          v-model="formData[col.key]"
          v-else-if="col.key !== 'id' && col.key !== 'category'"
        />
      </template>
      <BaseButton color="primary" type="filled" class="px-8 py-2 rounded-lg">
        Сохранить
      </BaseButton>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
