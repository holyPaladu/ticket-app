<script lang="ts" setup>
import { useProductStore } from "@/entities/product/productStore";
import { useCategoryStore } from "@/entities/category/categoryStore";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { capitalize } from "@/shared/utils/capitalize";
import BaseButton from "@/shared/ui/Button.vue";
import BaseInput from "@/shared/ui/Input.vue";
import BaseSelect from "@/shared/ui/Select.vue";

const { id } = useRoute().params;
const router = useRouter();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const formData = reactive<Record<string, any>>({});

const updateProduct = async () => {
  try {
    if (!id) return;
    await productStore.update(Number(id), formData);
    router.push({ name: "Products" });
  } catch (e) {
    console.error(e);
  }
};

onMounted(async () => {
  await productStore.find(Number(id));
  if (categoryStore.categories.length === 0) {
    await categoryStore.load();
  }
  if (productStore.product) {
    const exclude = ["id", "category"];
    for (const col of productStore.columns) {
      if (!exclude.includes(col.key)) {
        const value = productStore.product[col.key];
        if (col.type === "number" || col.type === "select") {
          // Проверяем, что value — объект и у него есть id
          formData[col.key] =
            value && typeof value === "object" && "id" in value
              ? value.id
              : value !== undefined && value !== null
              ? value
              : null;
        } else {
          formData[col.key] =
            value !== undefined && value !== null ? String(value) : "";
        }
      }
    }
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
    <h2 class="font-semibold text-3xl">Обновить продукт</h2>
    <form
      @submit.prevent="updateProduct"
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
