export class RepositoryColumnTableName {
  constructor(private _tableName: string) {}

  get value(): string {
    return this._tableName;
  }
}
