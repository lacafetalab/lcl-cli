import {AbstractGenerate, Template} from "../../AbstractGenerate";
import {Config} from "../../config/Config";
import {DataManagement} from "../../config/DataManagement";

const s = require("underscore.string");


export class Event extends AbstractGenerate {
    private config: Config;
    private _properties: string[];
    private _eventAction: string;
    private _eventName: string;

    constructor(_dataManagement: DataManagement, _currentEntity: string, eventAction: string, eventName: string, properties: string[] | null = null) {
        super();
        this.config = new Config(_dataManagement, _currentEntity);
        this._eventAction = s.capitalize(eventAction);
        this._eventName = eventName;
        this._properties = properties ?? this.config.properties;
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
        this._properties.forEach(propertie => {
            if (propertie !== 'id') {
                properties.push(propertie);
            }
        });
        return properties;
    }

    get template(): Template[] {
        const template: Template[] = [];

        const className = `${this.config.entity}${this._eventAction}DomainEvent`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `main/domain/event`;
        const data = {
            className,
            package: this.package,
            eventName: this._eventName,
            properties: this.properties,
            strProperties: this.strProperties(this.properties),
            strStringProperties: this.strProperties(this.properties, "String"),
            strPropertiesEquals: this.strPropertiesEquals(this.properties),
            strPropertiesMap: this.strPropertiesMap(this.properties)
        };
        template.push(new Template(this.folder, file, fileTemplate, data));

        return template;
    }

}
