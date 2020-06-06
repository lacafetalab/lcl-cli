import * as inquirer from 'inquirer';
import {questionCreateServiceCommand} from "../questions";
import {CommnadService} from "../../../sdk/codeMain/application/CommandService";
import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class ServiceCommandGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionCreateServiceCommand(this.config.properties));
        const command = new CommnadService(this._params.dataManagement, this._params.entityCurrent, answers.serviceName, answers.properties, answers.templateService);
        await this.renderTemplate(command.template);
    }
}


