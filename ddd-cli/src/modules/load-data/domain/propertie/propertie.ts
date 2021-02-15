import {PropertieName} from "./propertieName";
import {PropertieParam} from "./propertieParam";

export class Propertie {

    constructor(
        private _name: PropertieName,
        private _params: PropertieParam[]
    ) {
    }

    get name(): PropertieName {
        return this._name;
    }

    get params(): PropertieParam[] {
        return this._params;
    }
}