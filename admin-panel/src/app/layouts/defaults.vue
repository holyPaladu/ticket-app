<template>
  <div class="flex h-screen">
    <aside class="w-80 bg-bg text-text p-6 shadow-2xl flex flex-col gap-8">
      <h1 class="text-2xl font-semibold">Admin Panel</h1>
      <nav class="flex flex-col gap-2">
        <!-- <RouterLink class="block py-2" to="/dashboard">📊 Dashboard</RouterLink> -->
        <RouterLink
          class="block py-2 rounded-md text-base list--item"
          to="/users"
        >
          Users
        </RouterLink>
        <RouterLink
          class="block py-2 rounded-md text-base list--item"
          to="/products"
        >
          Products
        </RouterLink>
        <!-- <RouterLink class="block py-2" to="/settings">⚙️ Settings</RouterLink>  -->
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header
        class="bg-bg shadow-2xl px-6 py-4 flex justify-between items-center"
      >
        <div class="text-lg font-semibold">Админка</div>
        <button class="text-error">Выйти</button>
      </header>

      <main class="p-6 overflow-auto flex-1 bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.list {
  &--item {
    padding-inline: calc(var(--spacing) * 4);
    padding-block: calc(var(--spacing) * 2);

    &:hover {
      background-color: var(--color-gray-100);
      border-radius: var(--radius-lg);
    }
  }
}
</style>
