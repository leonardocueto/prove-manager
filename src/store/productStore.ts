import { IProduct } from "@/interface/product.interface";
import { reactive } from "vue";

const productStore = reactive({
  products: [] as IProduct[],
});

export { productStore };
