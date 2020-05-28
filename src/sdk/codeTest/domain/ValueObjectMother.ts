import {ConfigValueObject} from "@sdk/config/ConfigValueObject";
import {AbstractGenerate, Template} from "@sdk/AbstractGenerate";

export class ValueObjectMother extends AbstractGenerate {
    private config: ConfigValueObject;

    constructor(_data: any) {
        super();
        this.config = new ConfigValueObject(_data);
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
            const fileTemplate = `/project/templates/test/domain/vo_mother/${type.type}`;
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
