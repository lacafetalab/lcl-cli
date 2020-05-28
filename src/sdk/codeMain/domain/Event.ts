const s = require("underscore.string");

import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

export class Event extends AbstractGenerate {
    private config: Config;

    constructor(_data: any) {
        super();
        this.config = new Config(_data);
    }

    get folder(): string {
        return `${this.config.mainPath}/domain`;
    }

    get package(): string {
        return `${this.config.package}.domain`;
    }

    strPropertiesMap(properties: string[]): string {
        let str = "";
        properties.forEach(propertie => {
            str = str + `, (String) body.get("${propertie}")`;
        });
        return s.trim(s.trim(str, ','));
    }

    private get properties(): string[] {
        const properties: string[] = []
        this.config.properties.forEach(propertie => {
            if (propertie !== 'id') {
                properties.push(propertie);
            }
        });
        return properties;
    }

    get template(): Template[] {
        const template: Template[] = [];
        this.config.events.forEach(event => {
            const className = `${this.config.entity}${event.className}DomainEvent`;
            const file = `${this.folder}/${className}.java`;
            const fileTemplate = `/project/templates/main/domain/event`;
            const data = {
                className,
                package: this.package,
                eventName: event.name,
                properties: this.properties,
                strProperties: this.strProperties(this.properties),
                strStringProperties: this.strProperties(this.properties, "String"),
                strPropertiesEquals: this.strPropertiesEquals(this.properties),
                strPropertiesMap: this.strPropertiesMap(this.properties)
            };
            template.push(new Template(this.folder, file, fileTemplate, data));
        });
        return template;
    }

}
