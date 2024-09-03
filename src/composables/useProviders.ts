import { axios } from "@/utils/axios";
import { providersStore } from "@/store/providerStore";
import { computed } from "vue";
import { IProvider } from "@/interface/provider.interface";

export default function () {
  const getProviders = async () => {
    try {
      const { data } = await axios.get("/contacts?order_direction=ASC", {
        headers: {
          Authorization:
            "Basic bGVvY3VldG8xOTk5KzEwQGdtYWlsLmNvbTpjYTU0YjFlNjE5MDIxYTY0OTIzMQ==",
        },
      });
      providersStore.providers = data;
    } catch (error) {
      console.error("Error en la petición:", error);

      throw new Error("Error en la petición");
    }
  };

  const listProviders = computed(() => providersStore.providers);

  const addProvider = async (providerData: IProvider) => {
    console.log(providerData);
    try {
      const response = await axios.post("/contacts", providerData, {
        headers: {
          Authorization:
            "Basic bGVvY3VldG8xOTk5KzEwQGdtYWlsLmNvbTpjYTU0YjFlNjE5MDIxYTY0OTIzMQ==",
        },
      });
      console.log("Proveedor creado:", response.data);
      if (response.status == 200) getProviders();
    } catch (error) {
      console.error("Error al crear el proveedor:", error);
      throw new Error("Error al crear el proveedor");
    }
  };
  const deleteProvider = async (id: string | number) => {
    try {
      const response = await axios.delete(`/contacts?id=${id}`, {
        headers: {
          Authorization:
            "Basic bGVvY3VldG8xOTk5KzEwQGdtYWlsLmNvbTpjYTU0YjFlNjE5MDIxYTY0OTIzMQ==",
        },
      });
      console.log("Proveedor eliminado:", response.data);
      if (response.status == 200) getProviders();
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
      throw new Error("Error al eliminar el proveedor");
    }
  };
  const editProvider = async (provider: IProvider) => {
    try {
      const response = await axios.put(`/contacts/${provider.id}`, provider, {
        headers: {
          Authorization:
            "Basic bGVvY3VldG8xOTk5KzEwQGdtYWlsLmNvbTpjYTU0YjFlNjE5MDIxYTY0OTIzMQ==",
        },
      });
      if (response.status == 200) getProviders();
      console.log("Proveedor actualizado:", response.data);
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
      throw new Error("Error al actualizar el proveedor");
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
  };
}
