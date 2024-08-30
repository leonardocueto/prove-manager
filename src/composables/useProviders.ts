import { axios } from "@/utils/axios";
import { providersStore } from "@/store/providerStore";
import { computed } from "vue";

interface IProvider {
  id: number;
  name: string;
  email: string;
  city: string;
}

export default function () {
  const getProviders = async () => {
    try {
      const { data } = await axios.get(
        "/contacts?order_direction=ASC&type=provider"
      );

      providersStore.providers = data;
    } catch (error) {
      console.error("Error en la petición:", error);

      throw new Error("Error en la petición");
    }
  };

  const listProviders = computed(() => providersStore.providers);

  const addProvider = (provider: IProvider) => {
    providersStore.providers.push(provider);
  };

  const deleteProvider = (id: string | number) => {
    const index = providersStore.providers.findIndex((p) => p.id === id);
    providersStore.providers.splice(index, 1);
  };

  const editProvider = (provider: IProvider) => {
    const index = providersStore.providers.findIndex(
      (p) => p.id === provider.id
    );
    providersStore.providers[index] = provider;
  };

  const findProvider = (id: string | number): IProvider => {
    return (
      providersStore.providers.find((p) => p.id === id) || {
        id: 0,
        name: "",
        email: "",
        city: "",
      }
    );
  };

  return {
    listProviders,
    addProvider,
    deleteProvider,
    editProvider,
    findProvider,
    getProviders,
  };
}
