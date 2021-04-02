export class PropertieRequired {
  constructor(private _required: boolean) {}

  get value(): boolean {
    return this._required;
  }
}
