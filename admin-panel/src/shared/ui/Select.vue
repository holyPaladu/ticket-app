<script lang="ts" setup>
interface Props {
  label: string;
  options?: any[];
  disabled?: boolean;
}
defineProps<Props>();
const model = defineModel();
</script>

<template>
  <label class="w-full flex flex-col gap-2">
    <p class="text-xs leading-4 font-medium">{{ label }}</p>
    <select
      :disabled="disabled"
      v-model="model"
      class="w-full bg-transparent border border-border text-sm leading-6 rounded-md min-h-8.5 outline-none px-2 py-1"
    >
      <option
        v-for="opt in options"
        :key="typeof opt === 'object' && opt !== null ? opt.value : opt"
        :value="typeof opt === 'object' && opt !== null ? opt.value : opt"
      >
        {{ typeof opt === "object" && opt !== null ? opt.label : opt }}
      </option>
    </select>
  </label>
</template>

<style lang="scss" scoped></style>
