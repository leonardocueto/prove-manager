interface IAddress {
  city: string;
  province: string;
  address: string;
  postalCode: string;
}

interface IAccounting {
  debtToPay: number;
  accountReceivable: number;
}

interface IIdentificationObject {
  number: string;
  type: string;
}

interface IProvider {
  id?: string | number;
  ivaCondition: string;
  name: string;
  email: string;
  type: string;
  status: string;
  address?: IAddress;
  accounting?: IAccounting;
  identificationObject?: IIdentificationObject;
  phonePrimary?: string;
  phoneSecondary?: string;
  mobile?: string;
  seller?: number;
  priceList?: number;
  term?: number;
  fax?: string;
  ignoreRepeated?: boolean;
  statementAttached?: string;
}

export { IProvider };
