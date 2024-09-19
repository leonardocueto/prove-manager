import { axios } from "@/utils/axios";
import { productStore } from "@/store/productStore";
import { computed } from "vue";
import { IProduct } from "@/interface/product.interface";

export default function () {
  const getProduct = async () => {
    try {
      const { data } = await axios.get("/items");
      productStore.products = data;
      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      throw new Error((error as Error).message || "Error to get products");
    }
  };

  const addProduct = async (product: IProduct) => {
    try {
      const { data } = await axios.post("/items", product);
      productStore.products.push(data);
    } catch (error) {
      throw new Error((error as Error).message || "Error to create products");
    }
  };
  const editProduct = async (product: IProduct) => {
    try {
      await axios.put(`/items/${product.id}`, product);

      const index = productStore.products.findIndex(
        (p: IProduct) => p.id === product.id
      );
      if (index !== -1) {
        productStore.products[index] = { ...product };
      }
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
