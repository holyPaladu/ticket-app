import { defineStore } from "pinia";
import { ref } from "vue";
import type { ProductData } from "./productModel";
import type { ColumnDefinition } from "../user/userModel";
import * as productApi from "./productApi";

export const useProductStore = defineStore("product", () => {
  const products = ref<ProductData[]>([]);
  const product = ref<ProductData | null>(null);
  const loading = ref<boolean>(false);

  const columns = ref<ColumnDefinition<ProductData>[]>([
    { key: "id", type: "number", disabled: true },
    { key: "name", type: "text" },
    { key: "price", type: "number" },
    { key: "categoryId", type: "select", options: [] },
    { key: "category", type: "table" },
  ]);

  async function load(): Promise<void> {
    loading.value = true;
    try {
      products.value = await productApi.fetchAll();
    } finally {
      loading.value = false;
    }
  }
  async function remove(id: number): Promise<void> {
    await productApi.Delete(id);
    products.value = products.value.filter((u) => u.id === id);
  }
  async function find(id: number): Promise<void> {
    product.value = await productApi.fetchById(id);
  }
  async function create(payload: Record<string, string>) {
    const exist = await productApi.create(payload);
    products.value.push(exist);
  }
  async function update(id: number, payload: Record<string, string>) {
    const user = await productApi.update(id, payload);
    products.value.push(user);
  }

  return {
    products,
    product,
    loading,
    columns,
    load,
    remove,
    find,
    create,
    update,
  };
});
