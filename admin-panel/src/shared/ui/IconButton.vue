<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  color: "base" | "primary";
  type: "outline" | "fill" | "base";
}
defineProps<Props>();
</script>

<template>
  <button :disabled="disabled" :class="[`btn btn--${color} btn--${type}`]">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &--base {
    --btn-color-opacity: var(--color-gray-50);
    --btn-color: var(--color-gray-100);
  }
  &--primary {
    --btn-color-opacity: rgb(0, 123, 255, 0.1);
    --btn-color: #007bff;
  }
  &--outline {
    border: 1px solid var(--btn-color);
  }
  &--fill {
    background-color: var(--btn-color);
  }
  &--base {
    background-color: var(--color-white);
  }

  &:hover {
    background-color: var(--btn-color-opacity);
  }
}
</style>
