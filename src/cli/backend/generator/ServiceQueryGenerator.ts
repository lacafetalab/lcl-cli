import * as inquirer from 'inquirer';
import {questionCreateServiceQuery} from "../questions";
import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {QueryService} from "../../../sdk/codeMain/application/QueryService";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";

export class ServiceQueryGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionCreateServiceQuery(this.config.properties));
        const query = new QueryService(this._params.dataManagement, this._params.entityCurrent, answers.serviceName, answers.returnType, answers.properties, answers.templateService);
        await this.renderTemplate(query.template);
    }
}


