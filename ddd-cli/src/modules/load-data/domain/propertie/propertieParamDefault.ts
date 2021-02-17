export class PropertieParamDefault {
  constructor(private _default) {}

  get value() {
    return this._default;
  }
}
