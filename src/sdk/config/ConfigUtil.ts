// tslint:disable-next-line:no-var-requires
const s = require("underscore.string");

export interface ValueObjectPropertie {
    className: string,
    propertie: string
}

export class ConfigUtil {
    static valueObject(propertie: string, entity: string): string {
        const propertieCapitalize: string = s(propertie).trim().capitalize().value();
        return `${entity}${propertieCapitalize}`;
    }

    static valueObjectProperties(properties: string[], entity: string): ValueObjectPropertie[] {
        const voProperties: ValueObjectPropertie[] = [];
        properties.forEach(propertie => {
            voProperties.push({
                className: ConfigUtil.valueObject(propertie,entity),
                propertie
            })
        });
        return voProperties;
    }
}