import {AbstractGenerate, Template} from "../../AbstractGenerate";
import {Config} from "../../config/Config";
import {DataManagement} from "../../config/DataManagement";

const s = require("underscore.string");

export class EntityResponse extends AbstractGenerate {
    private config: Config;
    protected _properties: string[];

    constructor(_dataManagement: DataManagement, _currentEntity: string, properties: string[] | null = null,) {
        super();
        this.config = new Config(_dataManagement, _currentEntity);
        this._properties = properties ?? this.config.properties;
    }

    get folder(): string {
        return `${this.config.mainPath}/application`;
    }

    get package(): string {
        return `${this.config.package}.application`;
    }

    get entityResponseClass(): string {
        return `${this.config.entity}Response`;
    }

    get listEntityResponseClass(): string {
        return `List${this.config.entity}Response`;
    }

    get template(): Template[] {
        const template: Template[] = [];
        template.push(this.getTemplateEntity());
        template.push(this.getListTemplateEntity());
        return template;
    }

    private strPropertiesEntityToString(properties: string[], entityName: string) {
        let str = "";
        properties.forEach(propertie => {
            str = str + `, ${entityName}.${propertie}().toString()`;
        });
        return s.trim(s.trim(str, ','));
    }

    private getTemplateEntity(): Template {
        const className = this.entityResponseClass;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `main/application/response`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            package: this.package,
            strProperties: this.strProperties(this._properties),
            strPropertiesEntityToString: this.strPropertiesEntityToString(this._properties, this.config.entityClassPropertie),
            strStringProperties: this.strProperties(this._properties, "String"),
            strPropertiesEquals: this.strPropertiesEquals(this._properties),
            packageDomain: this.config.packageDomain,
            entityClass: this.config.entityClass,
            entityClassPropertie: this.config.entityClassPropertie,
            voProperties
        };
        return new Template(this.folder, file, fileTemplate, data);
    }

    private getListTemplateEntity(): Template {
        const className = this.listEntityResponseClass;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `main/application/listResponse`;
        const data = {
            className,
            package: this.package,
            entityResponseClass: this.entityResponseClass,
            entityResponseClassPropertie: `list${this.entityResponseClass}`
        };
        return new Template(this.folder, file, fileTemplate, data);
    }
}



