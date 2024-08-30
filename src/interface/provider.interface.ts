interface Address {
  city: string;
  province: string;
  address: string;
  postalCode: string;
}

interface Accounting {
  debtToPay: number;
  accountReceivable: number;
}

interface IdentificationObject {
  number: string;
  type: string;
}

interface Provider {
  address: Address;
  accounting: Accounting;
  identificationObject: IdentificationObject;
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

export { Provider };
