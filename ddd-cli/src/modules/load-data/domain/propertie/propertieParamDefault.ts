export class PropertieParamDefault{

    constructor(
        private _default:string
    ) {
    }

    get value(): string {
        return this._default;
    }
}