import { axios } from "@/utils/axios";
import { providersStore } from "@/store/providerStore";
import { computed, ref } from "vue";
import { IProvider } from "@/interface/provider.interface";

export default function () {
  const loading = ref<boolean>(false);
  const isEdit = ref<boolean>(false);

  const getProviders = async () => {
    loading.value = true;
    try {
      const { data } = await axios.get(
        "/contacts?order_direction=ASC&type=provider"
      );
      providersStore.providers = data;
      console.log("getProviders");
      loading.value = false;
    } catch (error) {
      console.error("Error en la petición:", error);

      alert({
        severity: "error",
        summary: "Error to get providers",
        detail: "Error to get providers " + error,
      });
    }
  };

  const listProviders = computed(() => providersStore.providers);

  const addProvider = async (providerData: IProvider) => {
    try {
      const response = await axios.post("/contacts", providerData);
      if (response.status == 200) getProviders();
    } catch (error) {
      throw new Error((error as Error).message || "Error to add provider");
    }
  };

  const deleteProvider = async (id: string | number) => {
    loading.value = true;
    try {
      const response = await axios.delete(`/contacts?id=${id}`);
      console.log("Proveedor eliminado:", response.data);
      if (response.status == 200) getProviders();
      loading.value = false;
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
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

      console.log("Provider actualizado:", updatedProvider);
    } catch (error) {
      console.log("Error al actualizar el proveedor:", error);
    }
  };

  const findProvider = (id: string | number): IProvider | null => {
    return (
      providersStore.providers.find(
        (provider: IProvider) => provider.id === id
      ) || null
    );
  };

  return {
    listProviders,
    addProvider,
    deleteProvider,
    editProvider,
    findProvider,
    getProviders,
    switchStatus,
    loading,
    isEdit,
  };
}
