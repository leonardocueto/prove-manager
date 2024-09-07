import { axios } from "@/utils/axios";
import { productStore } from "@/store/productStore";
import { computed } from "vue";
import { IProduct } from "@/interface/product.interface";

export default function () {
  const getProduct = async () => {
    try {
      const { data } = await axios.get("/items");
      productStore.products = data;
    } catch (error) {
      throw new Error((error as Error).message || "Error to get products");
    }
  };

  const addProduct = async (product: IProduct) => {
    try {
      const response = await axios.post("/items", product);
      if (response.status == 200) getProduct();
    } catch (error) {
      throw new Error((error as Error).message || "Error to create products");
    }
  };
  const editProduct = async (product: IProduct) => {
    try {
      const response = await axios.put(`/items/${product.id}`, product);
      if (response.status == 200) getProduct();
    } catch (error) {
      throw new Error((error as Error).message || "Error to update products");
    }
  };

  const findProduct = (id: string | number): IProduct | null => {
    return (
      productStore.products.find((product: IProduct) => product.id === id) ||
      null
    );
  };
  const listProducts = computed(() => productStore.products);

  return {
    getProduct,
    listProducts,
    addProduct,
    editProduct,
    findProduct,
  };
}
