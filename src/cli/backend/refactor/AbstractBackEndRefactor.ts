import {Template} from "../../../sdk/AbstractGenerate";
import {Config} from "../../../sdk/config/Config";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";
import path from "path";
import fs from "fs";
import {isEqualsFiles, runDiff} from "../../util/utildiff";
import {generateRender, generateRenderSync} from "../../util/utilgenerator";
import * as inquirer from "inquirer";
import {questionRenderFile} from "../questions";

const clipboardy = require('clipboardy');

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
        return new Config(this._params.dataManagement, this._params.entityCurrent);
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

    protected async generateFileAddRemoveProperties(templateOriginal: Template, templateNew: Template, showQuestion: boolean = false) {

        const fileGenerate = path.join(this._params.relativePath, templateOriginal.file);
        if (!fs.existsSync(fileGenerate)) {
            generateRenderSync(templateNew, this._params.relativePath, this._params.pathTemplates, "Generated");
            return;
        }
        let renderAgain: boolean = true;
        while (renderAgain) {
            const strClass = fs.readFileSync(fileGenerate, 'utf-8');
            const strRenderOriginal = generateRender(templateOriginal, this._params.pathTemplates);

            // si el archivo existente es igual al render original, se puede actizar el archivo
            if (isEqualsFiles(strClass, strRenderOriginal)) {
                fs.unlinkSync(fileGenerate);
                generateRenderSync(templateNew, this._params.relativePath, this._params.pathTemplates, "Updated");
                renderAgain = false;
                continue;
            }

            const strRenderNew = generateRender(templateNew, this._params.pathTemplates);

            let showMenuRenderError: boolean = true;
            while (showMenuRenderError) {
                const answers = await inquirer.prompt(questionRenderFile(templateOriginal.file));
                switch (answers.menuSelected) {
                    case 'Why no render?':
                        runDiff(strClass, strRenderOriginal);
                        clipboardy.writeSync(strRenderOriginal);
                        break;
                    case 'Render to clipboard':
                        clipboardy.writeSync(strRenderNew);
                        break;
                    case 'Show Diff':
                        runDiff(strRenderOriginal, strRenderNew);
                        break;
                    case 'Original to clipboard':
                        clipboardy.writeSync(strRenderOriginal);
                        break;
                    case 'Render again':
                        renderAgain = true;
                        showMenuRenderError = false;
                        break;
                    case 'Continue':
                        showMenuRenderError = false;
                        renderAgain = false;
                        break;
                }
            }
        }
    }

    public abstract async generate(): Promise<void>;

}

