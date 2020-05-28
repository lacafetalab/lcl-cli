import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

export class SqlRepository extends AbstractGenerate {
    private config: Config;

    constructor(_data: any) {
        super();
        this.config = new Config(_data);
    }

    get folder(): string {
        return `${this.config.mainPath}/infrastructure/persistence`;
    }

    get package(): string {
        return `${this.config.package}.infrastructure.persistence`;
    }

    get template(): Template[] {
        const template: Template[] = [];
        const className = `${this.config.entity}SqlRepository`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/infrastructure/persistence/sqlRepository`;
        const data = {
            className,
            entityClass: this.config.entityClass,
            package: this.package,
            entityIdClass: this.config.entityIdClass,
            entityClassPropertie: this.config.entityClassPropertie,
            packageDomain: this.config.packageDomain,
            entityDaoClass: `${this.config.entity}Dao`,
            entityRepositoryClass: `${this.config.entity}Repository`,
        };
        template.push(new Template(this.folder, file, fileTemplate, data));
        return template;
    }
}


