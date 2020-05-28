import {Config} from "@sdk/config/Config";

// tslint:disable-next-line:no-var-requires
const s = require("underscore.string");

interface PropertieMessage {
    required?: string | null,
    valid?: string | null
}

interface PropertieType {
    type: string,
    primitive: string,
    required: boolean,
    default: any
}

export class ConfigValueObject extends Config {

    constructor(_data: any) {
        super(_data)
    }

    private propertieDefault(): PropertieType {
        return {
            type: "",
            primitive: "",
            required: true,
            default: null,
        };
    }

    propertieType(propertie: string): PropertieType {
        let propType: PropertieType = this.propertieDefault();
        const propertieValue = this._data.properties.aggregate[propertie];
        if (typeof propertieValue === "string") {
            propType = this.formatPropertie(this._data.properties.aggregate[propertie]);
        } else if (typeof propertieValue === "object") {
            propType.type = propertieValue.type;
            if (typeof propertieValue.required !== "undefined") {
                propType.required = propertieValue.required;
            }
            // if (typeof propertie.default !== "undefined") {
            //     propType.default = propertie.default;
            // }
        }
        propType.primitive = this.primitivePropertie(propType.type);
        return propType;
    }

    private primitivePropertie(propertie: string): string {
        let primitive = 'undefined';
        switch (propertie) {
            case "id":
            case "string":
            case "text":
                primitive = "String";
                break;
            case "datetime":
                primitive = "Date";
                break;
        }
        return primitive;
    }

    private formatPropertie(propertie: string): PropertieType {
        const types: PropertieType = this.propertieDefault();
        switch (propertie) {
            case "id":
            case "string":
            case "datetime":
            case "text":
                types.type = propertie;
                break;
        }
        return types;
    }

    propertieMessage(propertie: string): PropertieMessage | null {
        let message: PropertieMessage;
        message = {
            required: null,
            valid: null
        };
        const messageValue = this._data.message.validate.valueObject[propertie];
        if (typeof messageValue === "undefined") {
            return message;
        }

        if (typeof messageValue.required !== "undefined") {
            message.required = messageValue.required;
        }
        if (typeof messageValue.valid !== "undefined") {
            message.valid = messageValue.valid;
        }

        return message;
    }
}