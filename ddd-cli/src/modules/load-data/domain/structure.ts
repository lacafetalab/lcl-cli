export interface AggregateData {
  path: string;
  nameSpace?: string;
  name: string;
  properties: any;
  entity?: Entity[];
  valueObject?: ValueObject[];
  message?: any;
  event?: string;
  repository?: Repository;
}

export interface Entity {
  name: string;
  properties: any;
}

export interface ValueObject {
  name: string;
  properties: any;
}

export interface Repository {
  pk: string;
  table: string;
  columnName: any;
}
