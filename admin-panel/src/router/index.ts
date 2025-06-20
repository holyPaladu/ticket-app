import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
// import { useAuthStore } from "@/store/authStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/app/layouts/defaults.vue"),
    children: [
      {
        path: "",
        redirect: "/users",
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/pages/userPages/index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "users/create",
        name: "UserCreate",
        component: () => import("@/pages/userPages/create.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "users/:id",
        name: "UserEdit",
        component: () => import("@/pages/userPages/edit.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     return next({ name: "Login" });
//   }
//   if (to.name === "Login" && authStore.isAuthenticated) {
//     return next({ name: "Dashboard" });
//   }
//   next();
// });

export default router;

// {
//   path: "/",
//   redirect: "/dashboard",
//   meta: { requiresAuth: true },
// },

// {
//   path: "/login",
//   name: "Login",
//   component: () => import("@/features/auth/loginForm.vue"),
// },

// {
//   path: "dashboard",
//   name: "Dashboard",
//   component: () => import("@/pages/DashboardPage/index.vue"),
//   meta: { requiresAuth: true },
// },

// {
//   path: "/:pathMatch(.*)*",
//   name: "NotFound",
//   component: () => import("@/pages/NotFound.vue"),
// },
