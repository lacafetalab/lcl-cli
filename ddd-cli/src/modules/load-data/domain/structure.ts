export interface Welcome {
  path: string;
  nameSpace: string;
  aggregate: Aggregate;
  entity: Entity[];
  valueObject: ValueObject[];
  message: Message;
  event: string;
  repository: Repository;
}

export interface Aggregate {
  name: string;
  properties: AggregateProperties;
}

export interface AggregateProperties {
  id: string;
  name: string;
  lastName: LastName;
  birthdate: string;
  emails: string;
  address: string;
  phones: Phones;
}

export interface LastName {
  type: string;
  required: boolean;
}

export interface Phones {
  type: string;
  min: number;
}

export interface Entity {
  name: string;
  properties: EntityProperties;
}

export interface EntityProperties {
  id: string;
  number: string;
}

export interface Message {
  'User:name': UserName;
  'User:Phone:number': User;
  'User:Address:street': User;
  'User:phones': UserPhones;
}

export interface User {
  required: string;
}

export interface UserName {
  required: string;
  valid: string;
}

export interface UserPhones {
  min: string;
}

export interface Repository {
  pk: string;
  table: string;
  columnName: ColumnName;
}

export interface ColumnName {
  id: string;
  name: string;
  lastName: string;
  birthdate: string;
  emails: string;
  address_street: string;
  address_number: string;
  phones: string;
}

export interface ValueObject {
  name: string;
  properties: ValueObjectProperties;
}

export interface ValueObjectProperties {
  street: string;
  number: string;
}
