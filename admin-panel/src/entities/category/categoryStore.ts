import { defineStore } from "pinia";
import { ref } from "vue";
import type { CategoryData } from "./categoryModel";
import type { ColumnDefinition } from "../user/userModel";
import * as categoryApi from "./categoryApi";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref<CategoryData[]>([]);
  const category = ref<CategoryData | null>(null);
  const loading = ref<boolean>(false);

  const columns = ref<ColumnDefinition<CategoryData>[]>([
    { key: "id", type: "number", disabled: true },
    { key: "name", type: "text" },
    { key: "products", type: "select", options: [] },
  ]);

  async function load(): Promise<void> {
    loading.value = true;
    try {
      categories.value = await categoryApi.fetchAll();
    } finally {
      loading.value = false;
    }
  }
  async function remove(id: number): Promise<void> {
    await categoryApi.Delete(id);
    categories.value = categories.value.filter((u) => u.id === id);
  }
  async function find(id: number): Promise<void> {
    category.value = await categoryApi.fetchById(id);
  }
  async function create(payload: Record<string, string>) {
    const exist = await categoryApi.create(payload);
    categories.value.push(exist);
  }
  async function update(id: number, payload: Record<string, string>) {
    const user = await categoryApi.update(id, payload);
    categories.value.push(user);
  }

  return {
    categories,
    category,
    loading,
    columns,
    load,
    remove,
    find,
    create,
    update,
  };
});
