import {ConfigUtil, IValueObjectPropertie} from "./ConfigUtil";
import {DataManagement} from "./DataManagement";

const s = require("underscore.string");

interface RepositoryDao {
    pk: string,
    table: string,
    columnName: any
}

export class Config {
    protected _data: any;

    constructor(protected _dataManagement: DataManagement, protected _currentEntity: string) {
        this._data = this._dataManagement.getData(this._currentEntity);
    }

    get repository(): RepositoryDao {
        const table: string = (this._data.repository.table) ? this._data.repository.table : s.underscored(this.entity);
        const columnName: any = (this._data.repository.columnName) ? this._data.repository.columnName : {};
        return {
            pk: this._data.repository.pk,
            table,
            columnName
        }
    }

    get eventPrefixEntity(): string {
        const prefix: string = (this._data.events && this._data.events.namePrefix) ? this._data.events.namePrefix : '';
        const eventName = `${prefix}.${this.entityClassPropertie}.`
        return s.ltrim(eventName, '.')
    }

    get entity(): string {
        return s.capitalize(this._data.name);
    }

    get entityClass(): string {
        return this.entity;
    }

    get entityIdClass(): string {
        return `${this.entity}Id`;
    }

    get entityClassPropertie(): string {
        return s.decapitalize(this.entity);
    }

    get path(): string {
        return this._data.path;
    }

    get package(): string {
        return this._data.package;
    }

    get packageDomain(): string {
        return `${this.package}.domain`;
    }

    get packageApplication(): string {
        return `${this.package}.application`;
    }

    get mainPath(): string {
        return `${this._data.path}/main/${this._data.package}`.replace(/\./g, "/");
    }

    get testPath(): string {
        return `${this._data.path}/test/${this._data.package}`.replace(/\./g, "/");
    }

    get properties(): string[] {
        const data: string[] = [];
        for (const propertie of Object.keys(this._data.properties.aggregate)) {
            data.push(propertie);
        }
        return data
    }

    valueObject(propertie: string): string {
        return ConfigUtil.valueObject(propertie, this.entity);
    }

    valueObjectProperties(properties: string[]): IValueObjectPropertie[] {
        return ConfigUtil.valueObjectProperties(properties, this.entity);
    }
}