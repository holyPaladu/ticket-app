<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  type: "outline" | "filled";
  color: "primary" | "secondary" | "white";
  text: string;
}
defineProps<Props>();
</script>

<template>
  <button
    :disabled="disabled"
    class="btn"
    :class="[`btn--${type} btn--${color}`]"
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.btn {
  // Цвета
  &--primary {
    --btn-bg: #007bff;
    --btn-border-color: #007bff;
    --btn-color: #007bff;
    --btn-filled-color: #fff;
  }
  &--secondary {
    --btn-bg: #6c757d;
    --btn-border-color: #6c757d;
    --btn-color: #6c757d;
    --btn-filled-color: #fff;
  }
  &--white {
    --btn-bg: #fff;
    --btn-border-color: #ccc;
    --btn-color: #333;
    --btn-filled-color: #333;
  }

  // Outline и filled
  &--outline {
    background-color: transparent;
    border: 1px solid var(--btn-border-color, #ccc);
    color: var(--btn-color, #333);
  }
  &--filled {
    background-color: var(--btn-bg, #333);
    color: var(--btn-filled-color, #fff);
    border: 1px solid var(--btn-bg, #333);
  }
}
</style>
