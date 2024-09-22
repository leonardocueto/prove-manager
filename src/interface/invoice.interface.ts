interface IInvoice {
  id: string;
  date: string;
  dueDate: string;
  datetime: string;
  observations: string | null;
  anotation: string;
  termsConditions: string;
  status: string;
  client: IClient;
  numberTemplate: INumberTemplate;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  totalPaid: number;
  balance: number;
  decimalPrecision: string;
  warehouse: IWarehouse;
  term: string;
  saleCondition: string | null;
  saleConcept: string | null;
  seller: string | null;
  priceList: IPriceList;
  items: IInvoiceItem[];
  costCenter: string | null;
  printingTemplate: IPrintingTemplate;
}

interface IClient {
  id: string;
  name: string;
  identification: string;
  phonePrimary: string | null;
  phoneSecondary: string | null;
  fax: string | null;
  mobile: string | null;
  email: string;
  address: IAddress;
  ivaCondition: string;
}

interface IAddress {
  province: string | null;
  city: string | null;
  address: string | null;
  postalCode: string | null;
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

interface IInvoiceItem {
  name: string;
  description: string;
  price: number;
  discount: number;
  reference: string;
  quantity: number;
  id: number;
  unit: string;
  tax: any[];
  total: number;
}

interface IPrintingTemplate {
  id: string;
  name: string;
  pageSize: string;
}

export { IInvoice };
