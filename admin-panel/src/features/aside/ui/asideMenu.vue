<script lang="ts" setup>
import BaseButton from "@/shared/ui/Button.vue";
import IconButton from "@/shared/ui/IconButton.vue";
import IconEdit from "@/shared/icons/edit.vue";
import IconDelete from "@/shared/icons/delete.vue";

interface Props {
  id?: number;
}
defineProps<Props>();
defineEmits<{
  (e: "close"): void;
  (e: "edit", id?: number): void;
  (e: "delete", id?: number): void;
}>();
</script>

<template>
  <div
    class="bg-black/10 absolute w-full h-full top-0 left-0 z-10"
    @click.self="$emit('close')"
  >
    <transition name="aside">
      <aside class="aside">
        <header class="aside__header">
          <div class="flex items-center gap-4">
            <IconButton
              class="size-10"
              color="primary"
              type="outline"
              @click="$emit('close')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#007bff"
                class="rotate-90"
              >
                <path
                  d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"
                />
              </svg>
            </IconButton>
            <h2 class="text-[28px] leading-8 font-semibold">Данные</h2>
          </div>
          <form class="flex gap-4">
            <BaseButton
              type="outline"
              color="primary"
              class="py-2 px-8 rounded-md"
              @click="$emit('edit', id)"
            >
              <IconEdit color="primary" />
              Редактировать
            </BaseButton>
            <BaseButton
              type="outline"
              color="error"
              class="py-2 px-8 rounded-md"
              @click="$emit('delete', id)"
            >
              <IconDelete color="error" />
              Удалить
            </BaseButton>
          </form>
        </header>
        <slot />
      </aside>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  min-width: 400px;
  background-color: white;
  z-index: 50;
  padding: 3rem 2rem 1.5rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
/* Transition */
.aside-enter-from,
.aside-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.aside-enter-active,
.aside-leave-active {
  transition: all 0.5s ease;
}
.aside-enter-to,
.aside-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
