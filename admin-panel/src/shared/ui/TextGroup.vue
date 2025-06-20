<script lang="ts" setup>
import type { Product } from "@/entities/product/productModel";

interface Props {
  title: string;
  value?: string | number | { id: number; name: string } | Product[];
  path?: string;
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
    <table v-else-if="Array.isArray(value) && value.length"></table>
    <RouterLink
      v-else-if="
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        'id' in value &&
        'name' in value
      "
      :to="`/${path}/${value.id}`"
      class="router-link"
    >
      {{ value.name }}
    </RouterLink>
  </hgroup>
</template>

<style lang="scss" scoped></style>
