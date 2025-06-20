import { createApp } from "vue";
import "@/assets/styles/style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "@/router";

const app = createApp(App);
// Pinia
const pinia = createPinia();
app.use(pinia);
// Провайдеры (например, i18n, уведомления и т.д.)
// setupProviders(app);
// Router
app.use(router);
app.mount("#app");
