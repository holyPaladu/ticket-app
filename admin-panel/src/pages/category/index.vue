<script lang="ts" setup>
import type { CategoryData } from "@/entities/category/categoryModel";
import { useCategoryStore } from "@/entities/category/categoryStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import BaseTable from "@/shared/ui/Table.vue";
import BaseButton from "@/shared/ui/Button.vue";
import TextGroup from "@/shared/ui/TextGroup.vue";
import asideMenu from "@/features/aside/ui/asideMenu.vue";

const categoryStore = useCategoryStore();
const router = useRouter();

const categories = ref<CategoryData[]>([]);
const show = ref<boolean>(false);

const onShow = async (id: number) => {
  show.value = true;
  await categoryStore.find(id);
};
const closeShow = () => {
  show.value = false;
};
const onDelete = async (id?: number) => {
  if (!id) return;
  if (confirm("Удалить пользователя?")) {
    await categoryStore.remove(id);
    await categoryStore.load();
    categories.value = categoryStore.categories;
    closeShow();
  }
};
const onEdit = (id?: number) => {
  if (!id) return;
  router.push({ name: "ProductEdit", params: { id } });
  closeShow();
};
const onCreate = () => {
  router.push({ name: "ProductCreate" });
  closeShow();
};

onMounted(async () => {
  await categoryStore.load();
  categories.value = categoryStore.categories;
});
</script>

<template>
  <div class="p-4 flex flex-col gap-8">
    <header class="flex justify-between">
      <h1 class="text-3xl">Категория</h1>
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
      :items="categories"
      :columns="categoryStore.columns"
      :loading="categoryStore.loading"
      @delete="onDelete"
      @edit="onEdit"
      @show="onShow"
    />
  </div>
  <teleport to="body">
    <asideMenu
      v-show="show"
      :id="categoryStore.category?.id"
      @close="closeShow"
      @delete="onDelete"
      @edit="onEdit"
    >
      <main class="flex flex-col gap-6">
        <template v-for="col in categoryStore.columns">
          <TextGroup
            :title="col.key"
            :value="categoryStore.category?.[col.key]"
            path="category"
          />
        </template>
      </main>
    </asideMenu>
  </teleport>
</template>

<style lang="scss" scoped></style>
