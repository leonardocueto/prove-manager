import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { createI18n } from "vue-i18n";
import ES from "@/locale/es.json";
import EN from "@/locale/en.json";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") ?? "EN",
  messages: {
    ES: ES,
    EN: EN,
  },
});
createApp(App).use(router).use(i18n).mount("#app");
