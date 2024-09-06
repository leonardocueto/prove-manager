import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { createI18n } from "vue-i18n";
import ES from "@/locale/es.json";
import EN from "@/locale/en.json";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") ?? "EN",
  messages: {
    ES: ES,
    EN: EN,
  },
});
createApp(App)
  .use(router)
  .use(i18n)
  .use(ToastService)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        darkModeSelector: ".my-app-dark",
        cssLayer: {
          name: "primevue",
          order: "tailwind-base, primevue, tailwind-utilities",
        },
      },
    },
  })
  .mount("#app");
