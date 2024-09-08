import { axios } from "@/utils/axios";
import { productStore } from "@/store/productStore";
import { computed } from "vue";
import { IProduct } from "@/interface/product.interface";

export default function () {
  const getProduct = async (forceUpdate = false) => {
    if (!forceUpdate && productStore.isLoaded) return;
    const cachedProduct = localStorage.getItem("products");

    if (cachedProduct && !forceUpdate) {
      productStore.products = JSON.parse(cachedProduct);
      productStore.isLoaded = true;
      return;
    }

    try {
      const { data } = await axios.get("/items");
      productStore.products = data;
      productStore.isLoaded = true;
      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      throw new Error((error as Error).message || "Error to get products");
    }
  };

  const addProduct = async (product: IProduct) => {
    try {
      const response = await axios.post("/items", product);
      if (response.status >= 200 && response.status < 300) {
        productStore.products.push(response.data);
        localStorage.setItem("products", JSON.stringify(response.data));
      }
    } catch (error) {
      throw new Error((error as Error).message || "Error to create products");
    }
  };
  const editProduct = async (product: IProduct) => {
    try {
      const response = await axios.put(`/items/${product.id}`, product);
      if (response.status >= 200 && response.status < 300) {
        const index = productStore.products.findIndex(
          (p: IProduct) => p.id === product.id
        );
        if (index !== -1) {
          productStore.products[index] = { ...product };
          localStorage.set("product", JSON.stringify(productStore.products));
        }
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
