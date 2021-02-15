export class Name{

    constructor(
        private _name:string
    ) {}

    get value(): string {
        return this._name;
    }
}