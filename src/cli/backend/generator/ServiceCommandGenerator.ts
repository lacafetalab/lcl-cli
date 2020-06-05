import * as inquirer from 'inquirer';
import {questionCreateServiceCommand} from "../questions";
import {CommnadService} from "../../../sdk/codeMain/application/CommandService";
import {BackEndAbstractGenerator, BackEndGeneratorConstructor} from "../BackEndAbstractGenerator";

const s = require("underscore.string");

export class ServiceCommandGenerator extends BackEndAbstractGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionCreateServiceCommand(this.config.properties));
        const command = new CommnadService(this.data, answers.serviceName, answers.properties, answers.templateService);
        this.renderTemplate(command.template);
    }
}


