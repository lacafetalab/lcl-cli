export class PropertieParamRequired{

    constructor(
        private _required:string
    ) {
    }

    get value(): string {
        return this._required;
    }
}