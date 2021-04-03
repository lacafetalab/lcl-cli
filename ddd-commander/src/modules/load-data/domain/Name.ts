// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Name {
  constructor(private _name: string) {}

  get value(): string {
    return s.capitalize(this._name);
  }

  get propertie(): string {
    return s.decapitalize(this._name);
  }
}
