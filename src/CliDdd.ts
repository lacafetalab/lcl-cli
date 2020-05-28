import * as inquirer from 'inquirer';
import {Config} from "@sdk/config/Config";
import {generateFile, logTemplate, readYaml} from "./Util";
import path from "path";
import {CommnadService} from "@sdk/codeMain/application/CommandService";


export class CliDdd {
    // @ts-ignore
    private _config: Config;
    private _pathFile: string = "";
    public loop: boolean = true;

    private get data() {
        return readYaml(this._pathFile);
    }

    private exit() {
        this.loop = false;
    }

    async menu() {
        const answers = await inquirer.prompt<{ menu: string }>([
            {
                type: 'rawlist',
                name: 'menu',
                message: `What do you want to do in ${this._config.entity}?`,
                choices: [
                    'Create Service Command',
                    'Create Service Query',
                    'Create Event',
                    'Generate All',
                    'Select file',
                    'Exit'
                ]
            }
        ]);
        await this.factoryService(answers.menu);
    }

    private async factoryService(service: string) {
        switch (service) {
            case 'Create Service Command':
                await this.createServiceCommand();
                break;
            case 'Create Service Query':
                console.log("servico Query");
                break;
            case 'Create Event':
                console.log("servico Event");
                break;
            case 'Generate All':
                console.log("servico All");
                break;
            case 'Select file':
                this._pathFile = "";
                break;
            case 'Exit':
                this.exit();
                break;
        }
    }

    private async createServiceCommand() {

        const answers = await inquirer.prompt<{ serviceName: string, properties: string[], templateService: string }>([
            {
                type: 'input',
                name: 'serviceName',
                message: `Nombre del servicio de applicacion`
            }, {
                type: 'checkbox',
                name: 'properties',
                message: `Properties`,
                choices: this._config.properties
            }, {
                type: 'list',
                name: 'templateService',
                message: `alguna plantilla a usar`,
                choices: ['create', 'update', 'delete', 'none'],
                default: "none"
            },
        ]);
        const command = new CommnadService(this.data, answers.serviceName, answers.properties, answers.templateService);
        logTemplate(command.template, true);
    }

    async selectFile(listFile: string[], pathFolder: string) {
        if (this._pathFile !== "") {
            return;
        }
        const answers = await inquirer.prompt<{ file: string }>([
            {
                type: 'list',
                name: 'file',
                message: `Selecciona el archivo de configuración`,
                choices: listFile
            },
        ]);

        this._pathFile = path.join(pathFolder, answers.file);

        this._config = new Config(this.data);
    }
}

