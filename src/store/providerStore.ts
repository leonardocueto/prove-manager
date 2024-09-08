import { IProvider } from "@/interface/provider.interface";
import { reactive } from "vue";

const providersStore = reactive({
  providers: [] as IProvider[],
  isLoaded: false,
});

export { providersStore };
