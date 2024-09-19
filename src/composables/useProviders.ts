import { axios } from "@/utils/axios";
import { providersStore } from "@/store/providerStore";
import { computed } from "vue";
import { IProvider } from "@/interface/provider.interface";

export default function () {
  const getProviders = async () => {
    try {
      const { data } = await axios.get("/contacts?");
      providersStore.providers = data;
    } catch (error) {
      throw new Error((error as Error).message || "Error to get providers");
    }
  };

  const addProvider = async (providerData: IProvider) => {
    try {
      const { data } = await axios.post("/contacts", providerData);
      providersStore.providers.push(data);
    } catch (error) {
      throw new Error((error as Error).message || "Error to add provider");
    }
  };

  const deleteProvider = async (id: string | number) => {
    try {
      await axios.delete(`/contacts?id=${id}`);
      providersStore.providers = providersStore.providers.filter(
        (provider: IProvider) => provider.id !== id
      );
    } catch (error) {
      throw new Error((error as Error).message || "Error to delete provider");
    }
  };

  const editProvider = async (provider: IProvider) => {
    try {
      await axios.put(`/contacts/${provider.id}`, provider);
      const index = providersStore.providers.findIndex(
        (p: IProvider) => p.id === provider.id
      );
      if (index !== -1) {
        providersStore.providers[index] = { ...provider };
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
