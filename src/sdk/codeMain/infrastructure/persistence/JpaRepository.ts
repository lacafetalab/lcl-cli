import {Config} from "@sdk/config/Config";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

export class JpaRepository extends AbstractGenerate {
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
        const className = `${this.config.entity}JpaRepository`;
        const entityDaoClass = `${this.config.entity}Dao`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `/project/templates/main/infrastructure/persistence/jpaRepository`;

        const data = {
            className,
            entityDaoClass,
            package: this.package
        };
        template.push(new Template(this.folder, file, fileTemplate, data));
        return template;
    }
}


