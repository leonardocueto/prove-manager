import { IInvoice } from "@/interface/invoice.interface";
import { reactive } from "vue";

const invoiceStore = reactive({
  invoices: [] as IInvoice[],
});

export { invoiceStore };
