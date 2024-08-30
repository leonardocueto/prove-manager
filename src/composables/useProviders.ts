import { axios } from "@/utils/axios";
import { useProviderStore } from "@/store/providerStore";
import { ref } from "vue";
import { computed } from "@vue/reactivity";
export default function () {
  const providerStore = useProviderStore();
  const getProviders = async () => {
    try {
      const resp = await axios.get(
        "/contacts?order_direction=ASC&type=provider"
      );
      console.log("Datos recibidos:", resp.data);
    } catch (error) {
      console.error("Error en la petición:", error);

      throw new Error("Error en la petición");
    }
  };

  const listProviders = computed(() => {
    return providerStore.providers;
  });
  const isCreateModalOpen = ref(false);
  const isUpdateModalOpen = ref(false);
  const formValues = ref({
    name: "",
    email: "",
    city: "",
  });

  const deleteProvider = (id: number) => {
    providerStore.deleteProvider(id);
  };

  const handleSubmit = (formValues: any) => {
    //cambiar por interface
    const lastIdProvider = providerStore.providers.length + 1;
    const newProvider = { ...formValues, id: lastIdProvider };
    providerStore.addProvider(newProvider);
    isCreateModalOpen.value = false;
  };

  //cambiar por interface
  const selectedProvider = ref<any | null>(null);
  const updateModalForm = (id: number) => {
    const selectProvider = providerStore.selectProvider(id);
    selectedProvider.value = selectProvider;
    isUpdateModalOpen.value = true;
  };

  const handleUpdateValues = (inputValues: any) => {
    if (selectedProvider.value) {
      selectedProvider.value.name = inputValues.name;
      selectedProvider.value.email = inputValues.email;
      selectedProvider.value.city = inputValues.city;
    }
    isUpdateModalOpen.value = false;
  };

  return {
    isCreateModalOpen,
    getProviders,
    listProviders,
    handleSubmit,
    formValues,
    deleteProvider,
    isUpdateModalOpen,
    updateModalForm,
    selectedProvider,
    handleUpdateValues,
  };
}
