import * as inquirer from 'inquirer';
import {questionCreateServiceQuery} from "../questions";
import {AbstractBackEndGenerator, BackEndGeneratorConstructor} from "./AbstractBackEndGenerator";
import {QueryService} from "../../../sdk/codeMain/application/QueryService";

export class ServiceQueryGenerator extends AbstractBackEndGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionCreateServiceQuery(this.config.properties));
        const query = new QueryService(this.data, answers.serviceName, answers.returnType, answers.properties, answers.templateService);
        this.renderTemplate(query.template);
    }
}


