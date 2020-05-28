import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

export class Repository extends AbstractGenerate {
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
        const className = `${this.config.entity}Repository`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/domain/repository`;
        const data = {
            className,
            entityClass: this.config.entityClass,
            package: this.package,
            entityIdClass: this.config.entityIdClass,
            entityClassPropertie: this.config.entityClassPropertie
        };
        template.push(new Template(this.folder, file, fileTemplate, data));
        return template;
    }
}


