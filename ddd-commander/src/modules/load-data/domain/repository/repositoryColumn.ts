import { RepositoryColumnPropertie } from './repositoryColumnPropertie';
import { RepositoryColumnTableName } from './repositoryColumnTableName';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class RepositoryColumn {
  constructor(private _propertie: RepositoryColumnPropertie, private _tableName: RepositoryColumnTableName) {}

  static createBlock(columns) {
    if (typeof columns === 'undefined') {
      return [];
    }
    return Object.entries(columns).map(([key, value]) => {
      return RepositoryColumn.create(key, value + '');
    });
  }

  static create(propertie: string, tableName: string) {
    return new RepositoryColumn(new RepositoryColumnPropertie(propertie), new RepositoryColumnTableName(tableName));
  }

  static createSlug(propertie: string) {
    const tableName = s.underscored(propertie);
    return this.create(propertie, tableName);
  }

  static createSlugValueObject(propertieNameParent: string, propertieName) {
    const tableNameParent = s.underscored(propertieNameParent);
    const tableName = s.underscored(propertieName);
    return this.create(`${propertieNameParent}.${propertieName}`, `${tableNameParent}_${tableName}`);
  }

  get propertie(): RepositoryColumnPropertie {
    return this._propertie;
  }

  get tableName(): RepositoryColumnTableName {
    return this._tableName;
  }
}
