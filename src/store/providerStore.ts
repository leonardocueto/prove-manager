import { IProvider } from "@/interface/provider.interface";
import { reactive } from "vue";

const providersStore = reactive({
  providers: [] as IProvider[],
});

export { providersStore };
