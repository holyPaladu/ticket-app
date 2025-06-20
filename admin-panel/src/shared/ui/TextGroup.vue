<script lang="ts" setup>
interface Props {
  title: string;
  value?: string | number;
}
defineProps<Props>();
</script>

<template>
  <hgroup class="flex flex-col gap-1">
    <h4 class="text-graytext text-xs font-light leading-4">{{ title }}</h4>
    <p class="text-sm leading-4 font-normal">{{ value }}</p>
  </hgroup>
</template>

<style lang="scss" scoped></style>
