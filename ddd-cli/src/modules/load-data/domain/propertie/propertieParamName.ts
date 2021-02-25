const s = require('underscore.string');

export class PropertieParamName {
  constructor(private _name: string) {}

  get value(): string {
    return s.decapitalize(this._name);
  }
}
