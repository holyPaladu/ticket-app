<script lang="ts" setup>
interface Props {
  label: string;
  type: "text" | "email" | "select" | "number" | "password" | "table";
  disabled?: boolean;
  required?: boolean;
}
defineProps<Props>();
const model = defineModel();
</script>

<template>
  <label class="w-full flex flex-col gap-2">
    <p class="text-xs leading-4 font-medium">{{ label }}</p>
    <input
      :type="type"
      :disabled="disabled"
      :required="required"
      v-model="model"
      class="w-full bg-transparent border border-border text-sm leading-6 rounded-md min-h-8.5 outline-none px-2 py-1"
    />
  </label>
</template>

<style lang="scss" scoped></style>
