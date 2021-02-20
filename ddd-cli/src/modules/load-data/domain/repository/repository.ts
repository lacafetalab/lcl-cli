import { RepositoryPk } from './repositoryPk';
import { RepositoryColumn } from './repositoryColumn';
import { Propertie } from '../propertie/propertie';
import { CollectionData } from '../CollectionData';

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

  getColumn(columnName: string): RepositoryColumn {
    const column = this._columns.find((e) => e.propertie.value === columnName);
    if (!column) {
      throw new Error(`column ${columnName} is not defined`);
    }
    return column;
  }

  setColumnDefaultValue(entityName: string, collection: CollectionData) {
    collection.getEntity(entityName).aggregate.params.forEach((e) => {
      if (e.type.isValueObject) {
        collection
          .getEntity(entityName)
          .getPropertie(e.name.value)
          .params.forEach((eh) => {
            this._columns.push(RepositoryColumn.createSlugValueObject(e.name.value, eh.name.value));
          });
      } else {
        this._columns.push(RepositoryColumn.createSlug(e.name.value));
      }
    });
  }
}
