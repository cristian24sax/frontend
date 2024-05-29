export interface Country {
  succeeded: boolean;
  message: string;
  errors: any[];
  data: DataCountry[];
}

export interface DataCountry {
  code_number: string;
  name: string;
  id: number;
  number_digits: string;
}
