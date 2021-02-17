export class RepositoryColumnPropertie {
  constructor(private _propertie: string) {}

  get value(): string {
    return this._propertie;
  }
}
