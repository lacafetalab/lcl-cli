import * as inquirer from 'inquirer';
import {questionCreateServiceQuery} from "../questions";
import {BackEndAbstractGenerator, BackEndGeneratorConstructor} from "../BackEndAbstractGenerator";
import {QueryService} from "../../../sdk/codeMain/application/QueryService";

export class ServiceQueryGenerator extends BackEndAbstractGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionCreateServiceQuery(this.config.properties));
        const query = new QueryService(this.data, answers.serviceName, answers.returnType, answers.properties, answers.templateService);
        this.renderTemplate(query.template);
    }
}


