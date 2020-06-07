import {DataManagement} from "./DataManagement";
import {InterfaceValueObjectPropertie, PropertieValue, ValueObjectPropertie} from "./ValueObjectPropertie";

const s = require("underscore.string");

interface RepositoryDao {
    pk: string,
    table: string,
    columnName: any
}

export class Config {
    protected _data: any;
    protected _voProperties: ValueObjectPropertie;

    constructor(protected _dataManagement: DataManagement, protected _currentEntity: string) {
        this._data = this._dataManagement.getData(this._currentEntity);
        this._voProperties = new ValueObjectPropertie(_dataManagement, _currentEntity);
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
        return this._voProperties.properties;
    }

    valueObject(propertie: string): string {
        return this._voProperties.valueObject(propertie);
    }

    valueObjectProperties(properties: string[]): InterfaceValueObjectPropertie[] {
        return this._voProperties.valueObjectProperties(properties);
    }

    valueObjectValue(propertie: string): PropertieValue {
        return this._voProperties.propertieValue(propertie);
    }

    isvalueObjectExternal(propertie: string): boolean {
        return this._voProperties.isExternal(propertie);
    }
}