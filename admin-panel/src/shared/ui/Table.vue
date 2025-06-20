<script setup lang="ts" generic="T extends { id: number }">
import { defineEmits } from "vue";
import moreHoriz from "@/assets/icons/more_horiz.svg";
import IconBtn from "@/shared/ui/IconButton.vue";
import type { ColumnDefinition } from "@/entities/user/userModel";

defineProps<{
  items: T[];
  columns: ColumnDefinition<T>[];
  loading: boolean;
}>();
defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", id: number): void;
  (e: "show", id: number): Promise<void>;
}>();
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <tr>
        <th v-for="col in columns" :key="String(col.key)">{{ col.key }}</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="col in columns" :key="String(col.key)">
          {{ item[col.key] }}
        </td>
        <td class="relative flex justify-end">
          <div class="relative group flex justify-end">
            <IconBtn color="base" type="base">
              <img
                :src="moreHoriz"
                alt="more-horiz-icons"
                class="size-6 object-cover"
              />
            </IconBtn>
            <ul
              class="list border border-gray-100/50 shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
            >
              <li>
                <button @click="$emit('show', item.id)" class="list__btn">
                  Показать
                </button>
              </li>
              <li>
                <button @click="onEdit(item.id)" class="list__btn">
                  Редактировать
                </button>
              </li>
              <li>
                <button
                  @click="$emit('delete', item.id)"
                  class="list__btn list--error"
                >
                  Удалить
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <ul>
            <li>
              <button @click="$emit('show', 1)" class="list__btn">
                Показать
              </button>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: var(--color-bg);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  line-height: var(--text-sm--line-height);

  &__head {
    tr {
      th {
        padding: 0.75rem 1rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: start;
        font-weight: 600;
        text-transform: capitalize;
      }
    }
  }
  &__body {
    tr {
      border-bottom: 1px solid var(--color-border);
      border-top: 1px solid var(--color-border);

      &:last-child {
        border: none;
      }
      td {
        padding: 1rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: start;
      }
    }
  }
}

.list {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 20;
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  &__btn {
    width: 100%;
    font-size: var(--text-sm);
    padding: 1rem 2rem;

    &:hover {
      background-color: var(--color-gray-50);
      border-radius: var(--radius-md);
    }
  }
  &--error {
    color: var(--color-error);
  }
}
</style>
