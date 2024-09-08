import { axios } from "@/utils/axios";
import { providersStore } from "@/store/providerStore";
import { computed } from "vue";
import { IProvider } from "@/interface/provider.interface";

export default function () {
  const getProviders = async (forceUpdate = false) => {
    if (!forceUpdate && providersStore.isLoaded) return;
    const cachedProviders = localStorage.getItem("providers");

    if (cachedProviders && !forceUpdate) {
      providersStore.providers = JSON.parse(cachedProviders);
      providersStore.isLoaded = true;
      return;
    }
    try {
      const { data } = await axios.get(
        "/contacts?order_direction=ASC&type=provider"
      );
      providersStore.providers = data;
      providersStore.isLoaded = true;
      localStorage.setItem("providers", JSON.stringify(data));
    } catch (error) {
      throw new Error((error as Error).message || "Error to get providers");
    }
  };

  const addProvider = async (providerData: IProvider) => {
    try {
      const response = await axios.post("/contacts", providerData);
      if (response.status >= 200 && response.status < 300) {
        providersStore.providers.push(response.data);

        localStorage.setItem(
          "providers",
          JSON.stringify(providersStore.providers)
        );
      }
    } catch (error) {
      throw new Error((error as Error).message || "Error to add provider");
    }
  };

  const deleteProvider = async (id: string | number) => {
    try {
      const response = await axios.delete(`/contacts?id=${id}`);
      if (response.status >= 200 && response.status < 300) {
        providersStore.providers = providersStore.providers.filter(
          (provider: IProvider) => provider.id !== id
        );
        localStorage.setItem(
          "providers",
          JSON.stringify(providersStore.providers)
        );
      }
    } catch (error) {
      throw new Error((error as Error).message || "Error to delete provider");
    }
  };

  const editProvider = async (provider: IProvider) => {
    try {
      const response = await axios.put(`/contacts/${provider.id}`, provider);
      if (response.status >= 200 && response.status < 300) {
        const index = providersStore.providers.findIndex(
          (p: IProvider) => p.id === provider.id
        );
        if (index !== -1) {
          providersStore.providers[index] = { ...provider };
          localStorage.setItem(
            "providers",
            JSON.stringify(providersStore.providers)
          );
        }
      }
    } catch (error) {
      throw new Error((error as Error).message || "Error to edit provider");
    }
  };

  const findProvider = (id: string | number): IProvider | null => {
    return (
      providersStore.providers.find(
        (provider: IProvider) => provider.id === id
      ) || null
    );
  };

  const listProviders = computed(() => providersStore.providers);

  return {
    listProviders,
    addProvider,
    deleteProvider,
    editProvider,
    findProvider,
    getProviders,
  };
}
