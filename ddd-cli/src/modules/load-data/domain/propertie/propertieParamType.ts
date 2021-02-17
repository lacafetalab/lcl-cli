export class PropertieParamType {
  constructor(private _type: string) {}

  get value(): string {
    return this._type;
  }
}
