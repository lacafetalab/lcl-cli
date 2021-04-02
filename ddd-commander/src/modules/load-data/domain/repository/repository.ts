import { RepositoryPk } from './repositoryPk';
import { RepositoryColumn } from './repositoryColumn';
import { CollectionData } from '../CollectionData';
import { Name } from '../Name';

export class Repository {
  constructor() {}

  /*constructor(private _name: string, private _pk: RepositoryPk, private _columns: RepositoryColumn[]) {}

  static create(repository: any, name: Name) {

    if (typeof repository === 'undefined') {
      repository = {};
    }
    return new Repository(
      `${name.value}Repository`,
      new RepositoryPk(repository.pk),
      RepositoryColumn.createBlock(repository.columns),
    );
  }

  /*get name(): string {
    return this._name;
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

  isColumn(columnName: string): boolean {
    const column = this._columns.find((e) => e.propertie.value === columnName);
    return !!column;
  }

  setColumnDefaultValue(entityName: string, collection: CollectionData) {
    collection.getEntity(entityName).aggregate.params.forEach((e) => {
      if (e.type.isValueObject) {
        if (e.type.voValue) {
          // es un valor que se trae de otra entidad, solo genra un campo en la tabla

          if (!this.isColumn(e.name.value)) {
            this._columns.push(RepositoryColumn.createSlug(e.name.value));
          }
        } else {
          collection
            .getEntity(e.type.voParent)
            .getPropertie(e.type.voPropertie)
            .params.forEach((eh) => {
              const rc = RepositoryColumn.createSlugValueObject(e.name.value, eh.name.value);
              if (!this.isColumn(rc.propertie.value)) {
                this._columns.push(rc);
              }
            });
        }
      } else {
        if (!this.isColumn(e.name.value)) {
          this._columns.push(RepositoryColumn.createSlug(e.name.value));
        }
      }
    });
  }
  */
}
