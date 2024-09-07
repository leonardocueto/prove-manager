import { axios } from "@/utils/axios";
import { providersStore } from "@/store/providerStore";
import { computed } from "vue";
import { IProvider } from "@/interface/provider.interface";

export default function () {
  const getProviders = async () => {
    try {
      const { data } = await axios.get(
        "/contacts?order_direction=ASC&type=provider"
      );
      providersStore.providers = data;
    } catch (error) {
      throw new Error((error as Error).message || "Error to get providers");
    }
  };

  const addProvider = async (providerData: IProvider) => {
    try {
      const response = await axios.post("/contacts", providerData);
      if (response.status == 200) getProviders();
    } catch (error) {
      throw new Error((error as Error).message || "Error to add provider");
    }
  };

  const deleteProvider = async (id: string | number) => {
    try {
      const response = await axios.delete(`/contacts?id=${id}`);
      if (response.status == 200) getProviders();
    } catch (error) {
      throw new Error((error as Error).message || "Error to delete provider");
    }
  };

  const editProvider = async (provider: IProvider) => {
    try {
      const response = await axios.put(`/contacts/${provider.id}`, provider);
      if (response.status == 200) getProviders();
    } catch (error) {
      throw new Error((error as Error).message || "Error to edit provider");
    }
  };

  const switchStatus = async (id: string | number) => {
    try {
      const provider = findProvider(id);
      if (!provider) {
        console.log(`Provider with id ${id} not found.`);
        return;
      }
      const updatedProvider = {
        ...provider,
        status: provider.status === "active" ? "inactive" : "active",
      };
      const response = await axios.put(`/contacts/${updatedProvider.id}`, {
        ivaCondition: updatedProvider.ivaCondition,
        name: updatedProvider.name,
        email: updatedProvider.email,
        status: updatedProvider.status,
        type: updatedProvider.type,
      });

      if (response.status == 200) getProviders();
    } catch (error) {
      throw new Error((error as Error).message || "Error to update products");
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
    switchStatus,
  };
}
