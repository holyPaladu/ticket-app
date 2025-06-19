<script setup lang="ts">
import { defineEmits, computed } from "vue";
// import { useRouter } from "vue-router";

const props = defineProps<{
  tables: any[];
  loading: boolean;
}>();
defineEmits<{
  (e: "delete", id: number): void;
}>();
// const router = useRouter();

const headKeys = computed(() =>
  props.tables.length > 0 ? Object.keys(props.tables[0]) : []
);

// function onEdit(id: number) {
//   router.push({ name: "UserEdit", params: { id } });
// }
</script>

<template>
  <table class="table">
    <thead class="table__head">
      <tr>
        <th v-for="key in headKeys" :key="key">{{ key }}</th>
        <th></th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr v-for="table in tables" :key="table.id">
        <td v-for="key in headKeys" :key="key">
          {{ table[key as keyof any] }}
        </td>
        <td>
          <!-- <button @click="$emit('delete', user.id)">Удалить</button>
          <button @click="onEdit(user.id)">Редактировать</button> -->
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
        overflow: hidden;
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
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: start;
      }
    }
  }
}
</style>
