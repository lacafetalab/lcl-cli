import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

const s = require("underscore.string");

export class QueryService extends AbstractGenerate {
    protected config: Config;
    protected _properties: string[];
    protected _templateService: string;
    protected serviceName: string;
    protected _returnType: string;

    constructor(_data: any, serviceName: string, returnType: string, properties: string[] | null = null, templateService: string = "none") {
        super();
        this.config = new Config(_data);
        this.serviceName = s.decapitalize(serviceName);
        this._returnType = returnType;
        this._properties = properties ?? this.config.properties
        this._templateService = templateService;
    }

    get returnType(): string {
        return this._returnType;
    }

    get properties(): string[] {
        return this._properties;
    }

    get templateService(): string {
        return this._templateService;
    }

    get folder(): string {
        return `${this.config.mainPath}/application/${s.underscored(this.serviceName)}`;
    }

    get package(): string {
        return `${this.config.package}.application.${s.underscored(this.serviceName)}`;
    }

    get prefixClassName(): string {
        return `${s.capitalize(this.serviceName)}${this.config.entity}`;
    }

    get entityResponseClass(): string {
        return `${this.config.entity}Response`;
    }

    get listEntityResponseClass(): string {
        return `List${this.config.entity}Response`;
    }

    get serviceClassResponse(): string {
        return (this.returnType === "entity") ? this.entityResponseClass : this.listEntityResponseClass;
    }

    get template(): Template[] {
        const template: Template[] = [];
        template.push(this.getTemplateService());
        template.push(this.getTemplateQuery());
        template.push(this.getTemplateQueryHandler());
        return template;
    }

    private getTemplateService(): Template {
        const className = this.prefixClassName;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/application/query/service`;
        const voProperties = this.config.valueObjectProperties(this._properties);
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
            serviceClassResponse:this.serviceClassResponse,
            entityResponseClass:this.entityResponseClass,
            listEntityResponseClass:this.listEntityResponseClass,
            packageApplication: this.config.packageApplication,
            voProperties
        };
        return new Template(this.folder, file, fileTemplate, data);
    }

    private getTemplateQuery(): Template {
        const className = `${this.prefixClassName}Query`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/application/query/query`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            package: this.package,
            strStringProperties: this.strProperties(this.properties, "String"),
            voProperties
        };
        return new Template(this.folder, file, fileTemplate, data);
    }

    private getTemplateQueryHandler(): Template {
        const className = `${this.prefixClassName}QueryHandler`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/application/query/queryHandler`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            classQueryName: `${this.prefixClassName}Query`,
            classServiceName: this.prefixClassName,
            package: this.package,
            packageDomain: this.config.packageDomain,
            strProperties: this.strProperties(this.properties),
            serviceClassResponse:this.serviceClassResponse,
            packageApplication: this.config.packageApplication,
            voProperties
        };
        return new Template(this.folder, file, fileTemplate, data);
    }
}



