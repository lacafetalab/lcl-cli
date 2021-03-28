export interface AggregateData {
  path: string;
  nameSpace?: string;
  name: string;
  properties: Properties;
  entity?: Entity[];
  valueObject?: ValueObject[];
  message?: any;
  event?: string;
  repository?: Repository;
}

export interface Entity {
  name: string;
  properties: Properties;
}

export interface ValueObject {
  name: string;
  properties: Properties;
}

export interface Repository {
  pk: string;
  table: string;
  columnName: any;
}

export interface Properties {
  [index: string]: string | Propertie;
}

export interface Propertie {
  type: string;
  required?: boolean;
  default?: null | string | number;
  min?: number;
  max?: number;
  values?: any;
}
