export interface IPetdata {
  id: number;
  uuid: string;
  deleted: boolean;
  canonical: string;
  schema_name: string;
  table_name: string;
  name: string;
  picture: string;
  specie_id: number;
  sex_key: string;
  age_key: string;
  size_key: string;
  neutered?: any;
  vaccinated?: any;
  import: boolean;
  description: string;
  status_key: string;
  price: string;
}