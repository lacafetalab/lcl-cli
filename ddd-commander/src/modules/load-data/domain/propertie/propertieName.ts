export class PropertieName {
  constructor(private _name: string, private aggregate: string) {}

  get value() {
    return this._name;
  }

  get fullName() {
    return `${this.aggregate}:${this._name}`;
  }
}
