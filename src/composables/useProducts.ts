import { axios } from "@/utils/axios";
import { productStore } from "@/store/productStore";
import { computed, ref } from "vue";
import { IProduct } from "@/interface/product.interface";
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
  const getProduct = async () => {
    loading.value = true;
    try {
      const { data } = await axios.get("/items");
      productStore.products = data;
      loading.value = false;
    } catch (error) {
      console.error("Error en la petición:", error);
      alert({
        severity: "error",
        summary: "Error to get items",
        detail: "Error to get items " + error,
      });
    }
  };
  const listProducts = computed(() => productStore.products);
  const addProduct = async (product: IProduct) => {
    loading.value = true;

    try {
      const response = await axios.post("/items", product);
      alert({
        severity: "success",
        summary: "Success to create item",
        detail: "Item created",
      });
      console.log("Item creado:", response.data);
      if (response.status == 200) getProduct();
      loading.value = false;
    } catch (error) {
      alert({
        severity: "error",
        summary: "Error to create item",
        detail: "Error to create item " + error,
      });
      console.error("Error al crear el item:", error);
    }
  };
  const editProduct = async (product: IProduct) => {
    loading.value = true;
    isEdit.value = false;
    try {
      console.log(product);
      const response = await axios.put(`/items/${product.id}`, product);
      if (response.status == 200) getProduct();
      loading.value = false;
      alert({
        severity: "success",
        summary: "Success to edit item",
        detail: "Item Edited",
      });
    } catch (error) {
      alert({
        severity: "error",
        summary: "Error to edit item",
        detail: "Error to edit item " + error,
      });
      console.error("Error al actualizar el item:", error);
    }
  };

  const findProduct = (id: string | number): IProduct | null => {
    return (
      productStore.products.find((product: IProduct) => product.id === id) ||
      null
    );
  };

  return {
    loading,
    isEdit,
    getProduct,
    listProducts,
    addProduct,
    editProduct,
    findProduct,
  };
}
