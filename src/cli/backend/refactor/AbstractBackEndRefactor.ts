
import {Template} from "../../../sdk/AbstractGenerate";
import {Config} from "../../../sdk/config/Config";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";
import {generateFileAddRempveProperties} from "../../util/utilrefactor";


export abstract class AbstractBackEndRefactor {
    protected _originalProperties: string[] = [];
    protected _newProperties: string[] = [];

    protected constructor(protected _params: InterfaceBackEndConstructor, answer: { type: string, properties: string[] }) {
        this.generateProperties(answer.type, answer.properties);
    }

    protected get data() {
        return this._params.dataManagement.getData(this._params.entityCurrent);
    }

    protected get config(): Config {
        return this._params.dataManagement.getConfig(this._params.entityCurrent);
    }

    generateProperties(type: string, answersProperties: string[]) {
        if (type === 'Add') {
            this._originalProperties = this.config.properties.filter(t => !answersProperties.includes(t));
            this._newProperties = this.config.properties;
        } else {
            this._originalProperties = this.config.properties;
            this._newProperties = this.config.properties.filter(t => !answersProperties.includes(t));
        }
    }

    protected async generateFileAddRemoveProperties(templateOriginal: Template, templateNew: Template,) {
        generateFileAddRempveProperties(templateOriginal, templateNew, this._params.relativePath, this._params.pathTemplates);
    }

    public abstract async generate(): Promise<void>;

}

