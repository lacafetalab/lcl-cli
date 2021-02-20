export class PropertieParamType {
  constructor(private _type: string) {}

  get value(): string {
    return this._type;
  }

  get isValueObject() {
    switch (this._type) {
      case 'id':
      case 'string':
      case 'boolean':
      case 'date':
        return false;
        break;
      default:
        return true;
        break;
    }
  }
}
