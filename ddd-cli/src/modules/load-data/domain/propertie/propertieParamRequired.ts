export class PropertieParamRequired{

    constructor(
        private _required:boolean
    ) {
    }


    get value(): boolean {
        return this._required;
    }
}