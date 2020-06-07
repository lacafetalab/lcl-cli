import {AbstractGenerate, Template} from "../../AbstractGenerate";
import {DataManagement} from "../../config/DataManagement";
import {Config} from "../../config/Config";

interface PropertieMessage {
    required?: string | null,
    valid?: string | null
}

export class ValueObject extends AbstractGenerate {
    private config: Config;
    private _data: any;

    constructor(_dataManagement: DataManagement, _currentEntity: string) {
        super();
        this.config = new Config(_dataManagement, _currentEntity);
        this._data = _dataManagement.getData(_currentEntity);
    }

    get folder(): string {
        return `${this.config.mainPath}/domain`;
    }

    get package(): string {
        return `${this.config.package}.domain`;
    }

    propertieMessage(propertie: string): PropertieMessage | null {
        let message: PropertieMessage;
        message = {
            required: null,
            valid: null
        };
        let messageValue: PropertieMessage;
        if (this._data.message && this._data.message.validate && this._data.message.validate.valueObject && this._data.message.validate.valueObject[propertie]) {
            messageValue = this._data.message.validate.valueObject[propertie];
        } else {
            return message;
        }

        if (typeof messageValue.required !== "undefined") {
            message.required = messageValue.required;
        }
        if (typeof messageValue.valid !== "undefined") {
            message.valid = messageValue.valid;
        }

        return message;
    }

    get template(): Template[] {
        const template: Template[] = [];
        this.config.properties.forEach(propertie => {
            const type = this.config.valueObjectValue(propertie);
            const message = this.propertieMessage(propertie);

            const className = this.config.valueObject(propertie);
            const file = `${this.folder}/${className}.java`;
            const fileTemplate = `main/domain/vo/${type.type}`;
            const data = {
                className,
                package: this.package,
                type,
                message
            };
            if (!type.isExternal) {
                template.push(new Template(this.folder, file, fileTemplate, data));
            }
        });
        return template;
    }

}
