import { IProvider } from "@/interface/provider.interface";
import { reactive } from "vue";

// const storedProviders = localStorage.getItem("providers");

// const providersStore = reactive({
//   providers: storedProviders ? JSON.parse(storedProviders) : [],
// });

const providersStore = reactive({
  providers: [] as IProvider[],
});

export { providersStore };
