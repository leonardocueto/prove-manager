import { axios } from "@/utils/axios";
import { providersStore } from "@/store/providerStore";
import { computed, ref } from "vue";
import { IProvider } from "@/interface/provider.interface";
import { useToast } from "primevue/usetoast";

export default function () {
  const toast = useToast();

  const alert = ({
    severity,
    summary,
    detail,
  }: {
    severity: "success" | "error";
    summary: string;
    detail: string;
  }) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };
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
    loading.value = true;
    console.log(providerData);
    try {
      const response = await axios.post("/contacts", providerData);
      console.log("Proveedor creado:", response.data);
      if (response.status == 200) getProviders();
      loading.value = false;
      alert({
        severity: "success",
        summary: "Success to create providers",
        detail: "Provider created",
      });
    } catch (error) {
      console.error("Error al crear el proveedor:", error);
      alert({
        severity: "error",
        summary: "Error to create provider",
        detail: "Error to create provider " + error,
      });
    }
  };
  const deleteProvider = async (id: string | number) => {
    loading.value = true;
    try {
      const response = await axios.delete(`/contacts?id=${id}`);
      console.log("Proveedor eliminado:", response.data);
      if (response.status == 200) getProviders();
      loading.value = false;
      alert({
        severity: "success",
        summary: "Success to delete provider",
        detail: "Provider Edited",
      });
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
      alert({
        severity: "error",
        summary: "Error to edit provider",
        detail: "Error to delete provider " + error,
      });
    }
  };
  const editProvider = async (provider: IProvider) => {
    loading.value = true;
    isEdit.value = false;
    try {
      console.log(provider);
      const response = await axios.put(`/contacts/${provider.id}`, provider);
      if (response.status == 200) getProviders();
      loading.value = false;
      alert({
        severity: "success",
        summary: "Success to edit provider",
        detail: "Provider Edited",
      });
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
      alert({
        severity: "error",
        summary: "Error to edit provider",
        detail: "Error to edit provider " + error,
      });
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
      alert({
        severity: "error",
        summary: "Error to switch status provider",
        detail: "Error to switch status provider" + error,
      });
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
