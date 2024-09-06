interface ICategory {
  id: string;
  name: string;
}

interface ICurrency {
  code: string;
  symbol: string;
}

interface IPrice {
  idPriceList?: number;
  name?: string;
  type?: string;
  price: number;
  currency?: ICurrency;
  main?: boolean;
}

interface IInventory {
  unit: string;
}

interface IProduct {
  id?: string;
  category?: ICategory;
  name: string;
  description: string;
  status?: string;
  price: IPrice[];
  inventory: IInventory;
}
export { IProduct };
