export class PropertieParamName {
  constructor(private _name: string) {}

  get value(): string {
    return this._name;
  }
}
