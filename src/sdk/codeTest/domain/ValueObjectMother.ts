import {AbstractGenerate, Template} from "../../AbstractGenerate";
import {DataManagement} from "../../config/DataManagement";
import {Config} from "../../config/Config";

export class ValueObjectMother extends AbstractGenerate {
    private config: Config;

    constructor(_dataManagement: DataManagement, _currentEntity: string) {
        super();
        this.config = new Config(_dataManagement, _currentEntity);
    }

    get folder(): string {
        return `${this.config.testPath}/domain`;
    }

    get package(): string {
        return `${this.config.package}.domain`;
    }

    get template(): Template[] {
        const template: Template[] = [];
        this.config.properties.forEach(propertie => {
            const type = this.config.valueObjectValue(propertie);

            const classEntity = this.config.valueObject(propertie);
            const className = `${classEntity}Mother`;
            const file = `${this.folder}/${className}.java`;
            const fileTemplate = `test/domain/vo_mother/${type.type}`;
            const data = {
                className,
                package: this.package,
                classEntity
            };
            if (!type.isExternal) {
                template.push(new Template(this.folder, file, fileTemplate, data));
            }

        });
        return template;
    }

}
