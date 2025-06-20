<script lang="ts" setup>
interface Props {
  disabled?: boolean;
}
defineProps<Props>();
</script>

<template>
  <button :disabled="disabled" :class="[`btn`]">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    background-color: var(--color-gray-50);
  }
}
</style>
