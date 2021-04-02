export class PropertieDefault {
  constructor(private _default) {}

  get value() {
    return this._default;
  }
}
