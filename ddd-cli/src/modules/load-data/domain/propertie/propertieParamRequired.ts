export class PropertieParamRequired{

    constructor(
        private _required:boolean
    ) {
    }


    get required(): boolean {
        return this._required;
    }
}