import { axios } from "@/utils/axios";
import { invoiceStore } from "@/store/invoiceStore";
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
  const addInvoice = async (invoiceData: IInvoice) => {
    try {
      const { data } = await axios.post("/invoices", invoiceData);
      invoiceStore.invoices.push(data);
    } catch (error) {
      throw new Error((error as Error).message || "Error to add provider");
    }
  };

  const listInvoices = computed(() => invoiceStore.invoices);
  return {
    getInvoices,
    listInvoices,
    addInvoice,
  };
}
