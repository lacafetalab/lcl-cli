import {RepositoryPk} from "./repositoryPk";
import {RepositoryColumn} from "./repositoryColumn";

export class Repository {

    constructor(
        private _pk: RepositoryPk,
        private _columns: RepositoryColumn[]
    ) {
    }

    static create(pk:string){
        const columns=[];
        return new Repository(new RepositoryPk(pk), columns);
    }


    get pk(): RepositoryPk {
        return this._pk;
    }

    get columns(): RepositoryColumn[] {
        return this._columns;
    }
}