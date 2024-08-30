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
  address: IAddress;
  accounting: IAccounting;
  identificationObject: IIdentificationObject;
  ivaCondition: string;
  name: string;
  phonePrimary: string;
  phoneSecondary: string;
  mobile: string;
  seller: number;
  priceList: number;
  term: number;
  email: string;
  type: string;
  status: string;
  fax: string;
  ignoreRepeated: boolean;
  statementAttached: string;
}

export { IProvider };
