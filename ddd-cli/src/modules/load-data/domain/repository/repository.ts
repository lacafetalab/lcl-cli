import { RepositoryPk } from './repositoryPk';
import { RepositoryColumn } from './repositoryColumn';
import { Propertie } from '../propertie/propertie';

export class Repository {
  constructor(private _pk: RepositoryPk, private _columns: RepositoryColumn[]) {}

  static create(repository: any) {
    if (typeof repository === 'undefined') {
      repository = {};
    }
    return new Repository(new RepositoryPk(repository.pk), RepositoryColumn.createBlock(repository.columns));
  }

  get pk(): RepositoryPk {
    return this._pk;
  }

  get columns(): RepositoryColumn[] {
    return this._columns;
  }

  setColumnDefaultValue(properties: Propertie[]) {
    properties.forEach((propertie) => {
      propertie.params.forEach((param) => {
        this._columns.push(RepositoryColumn.createSlug(param.name.value));
      });
    });
  }
}
