<script setup lang="ts">
import { defineEmits } from "vue";
import { useRouter } from "vue-router";

defineProps<{
  users: Array<{ id: number; name: string; email: string }>;
  loading: boolean;
}>();
defineEmits<{
  (e: "delete", id: number): void;
}>();

const router = useRouter();

function onEdit(id: number) {
  router.push({ name: "UserEdit", params: { id } });
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Имя</th>
        <th>Email</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button @click="$emit('delete', user.id)">Удалить</button>
          <button @click="onEdit(user.id)">Редактировать</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
