import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

export class Aggregate extends AbstractGenerate {
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

    get template(): Template[] {
        const template: Template[] = [];
        const className = this.config.entity;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/domain/aggregate`;
        const voProperties = this.config.valueObjectProperties(this.config.properties)
        const data = {
            className,
            package: this.package,
            strProperties: this.strProperties(this.config.properties),
            strPropertiesToString: this.strPropertiesToString(this.config.properties),
            strVoProperties: this.strVoProperties(voProperties),
            strPropertiesEquals: this.strPropertiesEquals(this.config.properties),
            voProperties
        };
        template.push(new Template(this.folder, file, fileTemplate, data));
        return template;
    }
}



