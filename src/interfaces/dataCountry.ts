export interface Country {
  succeeded: boolean;
  message: string;
  errors: any[];
  data: DataCountry[];
}

export interface DataCountry {
  id: number;
  name: string;
  code_number: string;
}
