export class RepositoryPk{

    constructor(
        private _pk:string
    ) {
    }


    get value(): string {
        return this._pk;
    }
}