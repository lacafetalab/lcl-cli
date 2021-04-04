export class PropertieType {
  constructor(private _type: string) {}

  get value(): string {
    return this._type;
  }

  get isValueObject() {
    return false;
  }

  isString() {
    return this.primitive === PropertieParamTypes.STRING;
  }

  get primitive(): string {
    let primitive = '';
    switch (this._type) {
      case PropertieParamTypes.ID:
        primitive = 'string';
        break;
      default:
        primitive = this._type;
    }
    return primitive;
  }
}

enum PropertieParamTypes {
  ID = 'id',
  STRING = 'string',
  BOOLEAN = 'boolean',
  DATE = 'date',
}
