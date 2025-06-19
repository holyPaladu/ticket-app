<template>
  <div class="flex h-screen">
    <aside class="w-64 bg-gray-900 text-white p-4">
      <div class="text-xl font-bold mb-6">Admin Panel</div>
      <nav>
        <!-- <RouterLink class="block py-2" to="/dashboard">📊 Dashboard</RouterLink>
        <RouterLink class="block py-2" to="/users">👥 Users</RouterLink>
        <RouterLink class="block py-2" to="/settings">⚙️ Settings</RouterLink> -->
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header
        class="bg-white shadow px-6 py-4 flex justify-between items-center"
      >
        <div class="text-lg font-semibold">Админка</div>
        <!-- <button @click="logout" class="text-red-500">Выйти</button> -->
      </header>

      <main class="p-6 overflow-auto flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
