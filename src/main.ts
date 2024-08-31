import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./index.css";
import { createI18n } from "vue-i18n";
import ES from "@/locale/es.json";
import EN from "@/locale/en.json";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { plugin as VueTippy } from "vue-tippy";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") ?? "EN",
  messages: {
    ES: ES,
    EN: EN,
  },
});
createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        darkModeSelector: "system",
        cssLayer: false,
      },
    },
  })
  .use(
    VueTippy,
    // optional
    {
      directive: "tippy", // => v-tippy
      component: "tippy", // => <tippy/>
      componentSingleton: "tippy-singleton", // => <tippy-singleton/>,
      defaultProps: {
        placement: "auto-end",
        allowHTML: true,
      }, // => Global default options * see all props
    }
  )
  .mount("#app");
