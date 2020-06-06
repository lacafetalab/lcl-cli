import {Template} from "../../../sdk/AbstractGenerate";
import {DataManagement} from "../../../sdk/config/DataManagement";
import {Config} from "../../../sdk/config/Config";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";
import {generateRender, generateRenderSync, logTemplate} from "../../util/utilgenerator";
import path from "path";
import fs from "fs";
import {isEqualsFiles, runDiff} from "../../util/utildiff";
import * as inquirer from "inquirer";
import {questionRenderGenerateFilePart1, questionRenderGenerateFilePart2} from "../questions";

const clipboardy = require('clipboardy');

export abstract class AbstractBackEndGenerator {
    protected _dataManagement: DataManagement;
    protected _entityCurrent: string;
    protected _relativePath: string;
    protected _pathTemplates: string;

    protected constructor(protected _params: InterfaceBackEndConstructor) {
        this._dataManagement = _params.dataManagement;
        this._entityCurrent = _params.entityCurrent;
        this._relativePath = _params.relativePath;
        this._pathTemplates = _params.pathTemplates;
    }

    protected get data() {
        return this._dataManagement.getData(this._entityCurrent);
    }

    protected get config(): Config {
        return new Config(this._dataManagement, this._entityCurrent);
    }

    protected async renderTemplate(templates: Template[], showConfig: boolean = false) {
        logTemplate(templates, showConfig);

        for (const template of templates) {
            const fileGenerate = path.join(this._relativePath, template.file);
            if (!fs.existsSync(fileGenerate)) {
                generateRenderSync(template, this._relativePath, this._pathTemplates, "Generated");
                continue;
            }
            console.log(`exist : ${path.join(this._relativePath, template.file)}`);
            // se genera render y copare para hacer un diff
            const strClass = fs.readFileSync(path.join(this._relativePath, template.file), 'utf-8');
            const strRender = generateRender(template, this._pathTemplates)

            if (!isEqualsFiles(strClass, strRender)) {
                let showMenuRenderError: boolean = true;
                while (showMenuRenderError) {
                    const answers = await inquirer.prompt(questionRenderGenerateFilePart1(template.file));
                    switch (answers.menuSelected) {
                        case 'Why is different?':
                            runDiff(strClass, strRender);
                            clipboardy.writeSync(strRender);
                            break;
                        case 'Original render to clipboard':
                            clipboardy.writeSync(strRender);
                            break;
                        case 'Render again --force':
                            const answers2 = await inquirer.prompt(questionRenderGenerateFilePart2(template.file));
                            if (answers2.deleteFile) {
                                fs.unlinkSync(fileGenerate);
                                generateRenderSync(template, this._relativePath, this._pathTemplates, "Replaced");
                                showMenuRenderError = false;
                            }
                            break;
                        case 'Continue':
                            showMenuRenderError = false;
                            break;
                    }
                }
            }
        }
    }

    public abstract async generate(): Promise<void>;

}

