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

  get voParent() {
    const sections = this._type.split(':');
    return sections[0] || null;
  }

  get voPropertie() {
    const sections = this._type.split(':');
    return sections[1] || null;
  }

  get voValue() {
    const sections = this._type.split(':');
    return sections[2] || null;
  }
}

enum PropertieParamTypes {
  ID = 'id',
  STRING = 'string',
  BOOLEAN = 'boolean',
  DATE = 'date',
}
