import { axios } from "@/utils/axios";
import { invoiceStore } from "@/store/invoiceStore";
import { productStore } from "@/store/productStore";
import { computed } from "vue";
import { IInvoice } from "@/interface/invoice.interface";

export default function () {
  const getInvoices = async () => {
    try {
      const { data } = await axios.get("/invoices");
      invoiceStore.invoices = data;
      localStorage.setItem("invoices", JSON.stringify(data));
    } catch (error) {
      throw new Error((error as Error).message || "Error to get invoices");
    }
  };

  const listInvoices = computed(() => invoiceStore.invoices);
  return {
    getInvoices,
    listInvoices,
  };
}
