import {ValueObjectPropertie} from "@sdk/config/ConfigUtil";

const s = require("underscore.string");

export class Template {
    constructor(private _folder: string, private _file: string, private _template: string, private _dataTemplate: any) {
    }

    get folder(): string {
        return this._folder;
    }

    get file(): string {
        return this._file;
    }

    get template(): string {
        return this._template;
    }

    get dataTemplate(): any {
        return this._dataTemplate;
    }
}

// tslint:disable-next-line:max-classes-per-file
export abstract class AbstractGenerate {
    strProperties(properties: string[], prefix: string = ""): string {
        let str = "";
        properties.forEach(propertie => {
            const strPrefix = s.trim(`${prefix} ${propertie}`)
            str = str + `, ${strPrefix}`;
        });
        return s.trim(s.trim(str, ','));
    }

    strPropertiesEquals(properties: string[]): string {
        let str = "";
        properties.forEach(propertie => {
            str = str + ` && Objects.equals(${propertie}, that.${propertie})`;
        });
        return s.ltrim(s.trim(str), '&& ');
    }

    strPropertiesToString(properties: string[]) {
        let str = "";
        properties.forEach(propertie => {
            str = str + `, ${propertie}.toString()`;
        });
        return s.trim(s.trim(str, ','));
    }

    strVoProperties(voProperties: ValueObjectPropertie[]): string {
        let str = "";
        voProperties.forEach(voPropertie => {
            str = str + `, ${voPropertie.className} ${voPropertie.propertie}`;
        });
        return s.trim(s.trim(str, ','));
    }

    abstract get template(): Template[];
}