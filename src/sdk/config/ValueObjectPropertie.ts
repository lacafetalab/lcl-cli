import {DataManagement} from "./DataManagement";

const s = require("underscore.string");

export interface PropertieValue {
    type: string,
    primitive: string,
    required: boolean,
    default: any,
    externalEntity?: string,
    externalPropertie?: string
}

export interface InterfaceValueObjectPropertie {
    className: string,
    propertie: string,
    package?: string
}

export class ValueObjectPropertie {

    private _data: any;
    private _externalName: string = "valueObject";

    constructor(private _dataManagement: DataManagement, private _currentEntity: string) {
        this._data = this._dataManagement.getData(this._currentEntity);
    }

    valueObject(propertie: string): string {
        const propertieValue: PropertieValue = this.propertieValue(propertie);
        if (propertieValue.type === this._externalName) {
            return `${propertieValue.externalEntity}${s.capitalize(propertieValue.externalPropertie)}`;
        } else {
            return `${this._currentEntity}${s.capitalize(propertie)}`;
        }
    }

    valueObjectProperties(properties: string[]): InterfaceValueObjectPropertie[] {

        const voProperties: InterfaceValueObjectPropertie[] = [];
        properties.forEach(propertie => {
            const voPropertie: InterfaceValueObjectPropertie = {
                className: this.valueObject(propertie),
                propertie
            };
            const propertieValue: PropertieValue = this.propertieValue(propertie);
            if (propertieValue.type === this._externalName && propertieValue.externalEntity != null) {
                const dataExternal = this._dataManagement.getData(propertieValue.externalEntity);
                // todo: crear una clase difernte a config que retorne toda esta data y dejar de usar el objeto enplano
                voPropertie.package = `${dataExternal.package}.domain`;
            }
            voProperties.push(voPropertie)
        });
        return voProperties;
    }

    get properties(): string[] {
        const data: string[] = [];
        for (const propertie of Object.keys(this._data.properties.aggregate)) {
            data.push(propertie);
        }
        return data
    }


    public propertieValue(propertie: string): PropertieValue {
        const propertieValue = this._data.properties.aggregate[propertie];
        if (typeof propertieValue === "string") {
            return this.processPropertieValue({'type': propertieValue});
        }
        if (typeof propertieValue === "object") {
            return this.processPropertieValue(propertieValue);
        }
        throw new Error("propertie value is have a object");
    }

    private processPropertieValue(value: object): PropertieValue {
        const propType: PropertieValue = {...this.propertieValueDefault(), ...value};
        if (propType.type === "") {
            throw new Error("value type is required");
        }

        if (propType.type.includes(":") && propType.type.split(":").length === 2) {
            const externalValue = propType.type.split(":");
            propType.type = this._externalName;
            propType.externalEntity = externalValue[0];
            propType.externalPropertie = externalValue[1];
        }

        if (propType.primitive === "") {
            propType.primitive = this.primitivePropertie(propType.type);
        }
        return propType;
    }

    private propertieValueDefault() {
        return {
            type: "",
            primitive: "",
            required: true,
            default: null,
        };
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

    // private validatePropertieTypes(type: string): void {
    //     switch (type) {
    //         case "id":
    //         case "string":
    //         case "datetime":
    //         case "text":
    //             break;
    //     }
    // }

    isExternal(propertie: string): boolean {
        const propertieValue: PropertieValue = this.propertieValue(propertie);
        return propertieValue.type === this._externalName;
    }
}