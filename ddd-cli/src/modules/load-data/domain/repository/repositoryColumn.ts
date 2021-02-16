import {RepositoryColumnPropertie} from "./repositoryColumnPropertie";
import {RepositoryColumnTableName} from "./repositoryColumnTableName";

export class RepositoryColumn {

    constructor(
        private _propertie: RepositoryColumnPropertie,
        private _tableName: RepositoryColumnTableName,
    ) {
    }

    static createBlock(columns) {
        if (typeof columns === "undefined") {
            return [];
        }
        return Object.entries(columns).map(([key, value]) => {
            return new RepositoryColumn(
                new RepositoryColumnPropertie(key),
                new RepositoryColumnTableName(value + '')
            );
        });
    }

    static create(propertie:string, tableName:string) {

            return new RepositoryColumn(
                new RepositoryColumnPropertie(propertie),
                new RepositoryColumnTableName(tableName)
            );

    }

    get propertie(): RepositoryColumnPropertie {
        return this._propertie;
    }

    get tableName(): RepositoryColumnTableName {
        return this._tableName;
    }


}