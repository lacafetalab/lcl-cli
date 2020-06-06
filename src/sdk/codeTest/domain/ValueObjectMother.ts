import {AbstractGenerate, Template} from "../../AbstractGenerate";
import {ConfigValueObject} from "../../config/ConfigValueObject";
import {DataManagement} from "../../config/DataManagement";

export class ValueObjectMother extends AbstractGenerate {
    private config: ConfigValueObject;

    constructor(_dataManagement: DataManagement, _currentEntity: string) {
        super();
        this.config = new ConfigValueObject(_dataManagement, _currentEntity);
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
            const type = this.config.propertieType(propertie);

            const classEntity = this.config.valueObject(propertie);
            const className = `${classEntity}Mother`;
            const file = `${this.folder}/${className}.java`;
            const fileTemplate = `test/domain/vo_mother/${type.type}`;
            const data = {
                className,
                package: this.package,
                classEntity
            };
            template.push(new Template(this.folder, file, fileTemplate, data));
        });
        return template;
    }

}
