import { IProvider } from "./provider.interface";
import { IProduct } from "./product.interface";

interface IInvoice {
  id?: string;
  date: string;
  dueDate: string;
  datetime?: string;
  observations?: string | null;
  anotation?: string;
  termsConditions?: string;
  status?: string;
  client?: IProvider;
  numberTemplate?: INumberTemplate;
  subtotal?: number;
  discount?: number;
  tax?: number;
  total?: number;
  totalPaid?: number;
  balanc?: number;
  decimalPrecision?: string;
  warehouse?: IWarehouse;
  term?: string;
  saleCondition?: string | null;
  saleConcept?: string | null;
  seller?: string | null;
  priceList?: IPriceList;
  items?: IProduct[];
  costCenter?: string | null;
  printingTemplate?: IPrintingTemplate;
}

interface INumberTemplate {
  id: string;
  prefix: string;
  number: string;
  text: string | null;
  documentType: string;
  fullNumber: string;
  formattedNumber: string;
  subDocumentType: string;
}

interface IWarehouse {
  id: string;
  name: string;
}

interface IPriceList {
  id: number;
  name: string;
}

interface IPrintingTemplate {
  id: string;
  name: string;
  pageSize: string;
}

export { IInvoice };
