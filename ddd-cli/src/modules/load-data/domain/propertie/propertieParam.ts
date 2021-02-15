import {PropertieParamName} from "./propertieParamName";
import {PropertieParamType} from "./propertieParamType";
import {PropertieParamRequired} from "./propertieParamRequired";
import {PropertieParamDefault} from "./propertieParamDefault";

export class PropertieParam {


    constructor(
        private _name: PropertieParamName,
        private _type: PropertieParamType,
        private _required: PropertieParamRequired,
        private _defaultValue: PropertieParamDefault
    ) {
    }

    get name(): PropertieParamName {
        return this._name;
    }

    get type(): PropertieParamType {
        return this._type;
    }

    get required(): PropertieParamRequired {
        return this._required;
    }

    get defaultValue(): PropertieParamDefault {
        return this._defaultValue;
    }

}