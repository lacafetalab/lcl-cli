import {RepositoryPk} from "./repositoryPk";
import {RepositoryColumn} from "./repositoryColumn";

export class Repository {

    constructor(
        private _pk: RepositoryPk,
        private _columns: RepositoryColumn[]
    ) {
    }


    get pk(): RepositoryPk {
        return this._pk;
    }

    get columns(): RepositoryColumn[] {
        return this._columns;
    }
}