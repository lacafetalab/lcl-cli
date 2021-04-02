export class PropertieType {
  constructor(private _type: string) {}

  get value(): string {
    return this._type;
  }

  get isValueObject() {
    return false;
  }
}

enum PropertieParamTypes {
  ID = 'id',
  STRING = 'string',
  BOOLEAN = 'boolean',
  DATE = 'date',
}
