import {RepositoryColumnPropertie} from "./repositoryColumnPropertie";
import {RepositoryColumnTableName} from "./repositoryColumnTableName";

export class RepositoryColumn{

    constructor(
        private _propertie:RepositoryColumnPropertie,
        private _tableName:RepositoryColumnTableName,
    ) {
    }


    get propertie(): RepositoryColumnPropertie {
        return this._propertie;
    }

    get tableName(): RepositoryColumnTableName {
        return this._tableName;
    }
}