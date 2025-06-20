<script lang="ts" setup>
import type { ProductData } from "@/entities/product/productModel";
import { useProductStore } from "@/entities/product/productStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import BaseTable from "@/shared/ui/Table.vue";
import BaseButton from "@/shared/ui/Button.vue";
import TextGroup from "@/shared/ui/TextGroup.vue";
import asideMenu from "@/features/aside/ui/asideMenu.vue";

const productStore = useProductStore();
const router = useRouter();

const products = ref<ProductData[]>([]);
const show = ref<boolean>(false);

const onShow = async (id: number) => {
  show.value = true;
  await productStore.find(id);
};
const closeShow = () => {
  show.value = false;
};
const onDelete = async (id?: number) => {
  if (!id) return;
  if (confirm("Удалить пользователя?")) {
    await productStore.remove(id);
    await productStore.load();
    products.value = productStore.products;
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
  await productStore.load();
  products.value = productStore.products;
});
</script>

<template>
  <div class="p-4 flex flex-col gap-8">
    <header class="flex justify-between">
      <h1 class="text-3xl">Продукты</h1>
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
      :items="products"
      :columns="productStore.columns.filter((u) => u.key !== 'categoryId')"
      :loading="productStore.loading"
      @delete="onDelete"
      @edit="onEdit"
      @show="onShow"
    />
  </div>
  <teleport to="body">
    <asideMenu
      v-show="show"
      :id="productStore.product?.id"
      @close="closeShow"
      @delete="onDelete"
      @edit="onEdit"
    >
      <main class="flex flex-col gap-6">
        <template v-for="col in productStore.columns">
          <TextGroup
            :title="col.key"
            :value="productStore.product?.[col.key]"
          />
        </template>
      </main>
    </asideMenu>
  </teleport>
</template>

<style lang="scss" scoped></style>
