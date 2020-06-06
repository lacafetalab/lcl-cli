import * as inquirer from 'inquirer';
import {questionMenu, questionSelectFile} from "../questions";
import {DataManagement} from "../../../sdk/config/DataManagement";
import {ServiceCommandGenerator} from "../generator/ServiceCommandGenerator";
import {AbstractBackEndGenerator} from "../generator/AbstractBackEndGenerator";
import {ServiceQueryGenerator} from "../generator/ServiceQueryGenerator";
import {EventGenerator} from "../generator/EventGenerator";
import {CoreMenuGenerator} from "./CoreMenuGenerator";
import {AddOrRemoveMenuRefactor} from "./AddOrRemoveMenuRefactor";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";

const s = require("underscore.string");

export class BackEndMenu {
    private _entityCurrent: string = "";
    private _continue: boolean = true;

    constructor(private _dataManagement: DataManagement, private _relativePath: string, private _pathTemplates: string) {

    }

    public get continueMenu() {
        return this._continue;
    }

    private exit() {
        this._continue = false;
    }
    async selectEntity() {
        if (this._entityCurrent !== "") {
            return;
        }
        if (this._dataManagement.length === 1) {
            this._entityCurrent = this._dataManagement.entities[0];
        } else {
            const answers = await inquirer.prompt(questionSelectFile(this._dataManagement.entities));
            this._entityCurrent = answers.entity;
        }
    }
    async menu() {
        let listMenu = [
            'Create Service Command',
            'Create Service Query',
            'Create Event',
            'Generate Core',
            'Add or Remove Propertie',
            'Select Entity',
            'Exit'
        ];
        if (this._dataManagement.length === 1) {
            listMenu = listMenu.filter(t => {
                return t !== 'Select Entity'
            });
        }
        const answers = await inquirer.prompt(questionMenu(this._entityCurrent, listMenu));
        await this.factoryService(answers.menuSelected);
    }

    private async factoryService(service: string) {
        const params: InterfaceBackEndConstructor = {
            dataManagement: this._dataManagement,
            entityCurrent: this._entityCurrent,
            relativePath: this._relativePath,
            pathTemplates: this._pathTemplates
        }
        let generator: AbstractBackEndGenerator | null = null;
        switch (service) {
            case 'Create Service Command':
                generator = new ServiceCommandGenerator(params);
                break;
            case 'Create Service Query':
                generator = new ServiceQueryGenerator(params);
                break;
            case 'Create Event':
                generator = new EventGenerator(params);
                break;
            case 'Generate Core':
                generator = new CoreMenuGenerator(params);
                break;
            case 'Add or Remove Propertie':
                generator = new AddOrRemoveMenuRefactor(params);
                break;
            case 'Select Entity':
                this._entityCurrent = "";
                break;
            case 'Exit':
                this.exit();
                break;
        }
        if (generator !== null) {
            await generator.generate();
        }


    }
}

