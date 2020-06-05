import * as inquirer from 'inquirer';
import {generateFile, logTemplate} from "../Util";
import {Template} from "../../sdk/AbstractGenerate";
import {DataManagement} from "../../sdk/config/DataManagement";
import {questionCreateServiceCommand} from "./questions";
import {CommnadService} from "../../sdk/codeMain/application/CommandService";
import {Config} from "../../sdk/config/Config";


const s = require("underscore.string");

export interface BackEndGeneratorConstructor {
    dataManagement: DataManagement;
    entityCurrent: string;
    relativePath: string;
    pathTemplates: string;
}

export abstract class BackEndAbstractGenerator {
    protected _dataManagement: DataManagement;
    protected _entityCurrent: string;
    protected _relativePath: string;
    protected _pathTemplates: string;

    constructor(params: BackEndGeneratorConstructor) {
        this._dataManagement = params.dataManagement;
        this._entityCurrent = params.entityCurrent;
        this._relativePath = params.relativePath;
        this._pathTemplates = params.pathTemplates;
    }

    protected get data() {
        return this._dataManagement.getData(this._entityCurrent);
    }

    protected get config(): Config {
        return this._dataManagement.getConfig(this._entityCurrent);
    }

    protected renderTemplate(templates: Template[], showConfig: boolean = false) {
        logTemplate(templates, showConfig);
        generateFile(templates, this._relativePath, this._pathTemplates);
    }

    public abstract async generate(): Promise<void>;

}

