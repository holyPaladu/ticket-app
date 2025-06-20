<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  type: "outline" | "filled";
  color: "primary" | "secondary" | "white" | "error";
}
defineProps<Props>();
</script>

<template>
  <button
    :disabled="disabled"
    class="btn"
    :class="[`btn--${type} btn--${color}`]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  gap: 1rem;

  // Цвета
  &--primary {
    --btn-bg: #007bff;
    --btn-bg-rgb-opacity: rgb(0, 123, 255, 0.1);
    --btn-border-color: #007bff;
    --btn-color: #007bff;
    --btn-filled-color: #fff;
  }
  &--secondary {
    --btn-bg: #6c757d;
    --btn-bg-rgb-opacity: rgba(108, 117, 125, 0.1);
    --btn-border-color: #6c757d;
    --btn-color: #6c757d;
    --btn-filled-color: #fff;
  }
  &--white {
    --btn-bg: #fff;
    --btn-bg-rgb-opacity: rgba(255, 255, 255, 0.1);
    --btn-border-color: #ccc;
    --btn-color: #333;
    --btn-filled-color: #333;
  }
  &--error {
    --btn-bg: var(--color-error);
    --btn-bg-rgb-opacity: rgb(239, 68, 68, 0.1);
    --btn-border-color: var(--color-error);
    --btn-color: var(--color-error);
    --btn-filled-color: var(--color-error);
  }

  // Outline и filled
  &--outline {
    background-color: transparent;
    border: 1px solid var(--btn-border-color, #ccc);
    color: var(--btn-color, #333);

    &:hover {
      background-color: var(--btn-bg-rgb-opacity);
    }
  }
  &--filled {
    background-color: var(--btn-bg, #333);
    color: var(--btn-filled-color, #fff);
    border: 1px solid var(--btn-bg, #333);
  }
}
</style>
