<script lang="ts" setup>
interface Props {
  title: string;
  value?: string | number | { id: number; name: string };
}
defineProps<Props>();
</script>

<template>
  <hgroup class="flex flex-col gap-1">
    <h4 class="text-graytext text-xs font-light leading-4 capitalize">
      {{ title }}
    </h4>
    <p
      class="text-sm leading-4 font-normal"
      v-if="typeof value === 'string' || typeof value === 'number'"
    >
      {{ value }}
    </p>
    <pre v-else>
      {{ value }}
    </pre>
  </hgroup>
</template>

<style lang="scss" scoped></style>
