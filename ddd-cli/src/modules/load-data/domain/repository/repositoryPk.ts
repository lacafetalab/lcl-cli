export class RepositoryPk {
  constructor(private _pk: string) {}

  get value(): string {
    return this._pk;
  }

  setDefaultValue() {
    if (typeof this._pk === 'undefined') {
      this._pk = 'id';
    }
  }
}
