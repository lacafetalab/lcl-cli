export class DataManagement {
    private _allData = {};
    private _entities: string[] = [];

    constructor(protected _fileData: any[]) {
        _fileData.forEach(data => {
            // @ts-ignore
            this._allData[data.name] = data;
            this.entities.push(data.name);
        });
    }

    get length() {
        return this._entities.length;
    }

    get entities(): string[] {
        return this._entities;
    }

    private isEntityName(entityName: string): boolean {
        return this._entities.indexOf(entityName) !== -1;
    }

    getData(entityName: string): any {
        if (!this.isEntityName(entityName)) {
            throw new Error("No existe esta entidad");
        }
        // @ts-ignore
        return this._allData[entityName];
    }
}