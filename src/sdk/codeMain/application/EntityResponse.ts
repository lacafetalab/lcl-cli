import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

const s = require("underscore.string");

export class EntityResponse extends AbstractGenerate {
    private config: Config;

    constructor(_data: any) {
        super();
        this.config = new Config(_data);
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
        const fileTemplate = `/project/templates/main/application/response`;
        const voProperties = this.config.valueObjectProperties(this.config.properties)
        const data = {
            className,
            package: this.package,
            strProperties: this.strProperties(this.config.properties),
            strPropertiesEntityToString: this.strPropertiesEntityToString(this.config.properties, this.config.entityClassPropertie),
            strStringProperties: this.strProperties(this.config.properties, "String"),
            strPropertiesEquals: this.strPropertiesEquals(this.config.properties),
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
        const fileTemplate = `/project/templates/main/application/listResponse`;
        const data = {
            className,
            package: this.package,
            entityResponseClass: this.entityResponseClass,
            entityResponseClassPropertie: `list${this.entityResponseClass}`
        };
        return new Template(this.folder, file, fileTemplate, data);
    }
}



