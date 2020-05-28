import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

const s = require("underscore.string");

export class CommnadService extends AbstractGenerate {
    private config: Config;
    private _properties: string[];
    private _templateService: string;
    private serviceName: string;

    constructor(_data: any, serviceName: string, properties: string[] | null = null, templateService: string = "none") {
        super();
        this.config = new Config(_data);
        this.serviceName = s.decapitalize(serviceName);
        this._properties = properties ?? this.config.properties
        this._templateService = templateService;
    }

    get properties(): string[] {
        return this._properties;
    }

    get templateService(): string {
        return this._templateService;
    }

    get folder(): string {
        return `${this.config.mainPath}/application/${this.serviceName}`;
    }

    get package(): string {
        return `${this.config.package}.application.${this.serviceName}`;
    }

    get template(): Template[] {
        const template: Template[] = [];
        template.push(this.getTemplateService());
        template.push(this.getTemplateCommand());
        template.push(this.getTemplateCommandHandler());
        return template;
    }

    get prefixClassName(): string {
        return `${s.capitalize(this.serviceName)}${this.config.entity}`;
    }

    private getTemplateService(): Template {
        const className = this.prefixClassName;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/application/command/service`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            entityRepositoryClass: `${this.config.entity}Repository`,
            entityClass: this.config.entityClass,
            entityClassPropertie: this.config.entityClassPropertie,
            packageDomain: this.config.packageDomain,
            serviceTemplate: this.templateService,
            package: this.package,
            strProperties: this.strProperties(this._properties),
            strVoProperties: this.strVoProperties(voProperties),
            voProperties
        };
        return new Template(this.folder, file, fileTemplate, data);
    }

    private getTemplateCommand(): Template {
        const className = `${this.prefixClassName}Command`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/application/command/command`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            package: this.package,
            strStringProperties: this.strProperties(this.properties, "String"),
            voProperties
        };
        return new Template(this.folder, file, fileTemplate, data);
    }

    private getTemplateCommandHandler(): Template {
        const className = `${this.prefixClassName}CommandHandler`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/application/command/commandHandler`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            classCommandName:`${this.prefixClassName}Command`,
            classServiceName:this.prefixClassName,
            package: this.package,
            packageDomain: this.config.packageDomain,
            strProperties: this.strProperties(this.properties),
            voProperties
        };
        return new Template(this.folder, file, fileTemplate, data);
    }
}



