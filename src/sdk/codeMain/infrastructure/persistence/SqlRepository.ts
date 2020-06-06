import {AbstractGenerate, Template} from "../../../AbstractGenerate";
import {Config} from "../../../config/Config";
import {DataManagement} from "../../../config/DataManagement";


export class SqlRepository extends AbstractGenerate {
    private config: Config;

    constructor(_dataManagement: DataManagement, _currentEntity: string) {
        super();
        this.config = new Config(_dataManagement, _currentEntity);
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
        const fileTemplate = `main/infrastructure/persistence/sqlRepository`;
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


