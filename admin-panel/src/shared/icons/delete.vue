<script lang="ts" setup>
interface Props {
  color: "base" | "primary" | "error";
}
defineProps<Props>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#e0e0e0"
    :class="[`icon icon--${color}`]"
  >
    <path
      d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
    />
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  &--base {
    fill: #e0e0e0;
  }
  &--primary {
    fill: #007bff;
  }
  &--error {
    fill: var(--color-error);
  }
}
</style>
