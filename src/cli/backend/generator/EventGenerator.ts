import * as inquirer from 'inquirer';
import {questionCreateEventPart1, questionCreateEventPart2} from "../questions";
import {BackEndAbstractGenerator, BackEndGeneratorConstructor} from "../BackEndAbstractGenerator";
import {Event as EventDdd} from "../../../sdk/codeMain/domain/Event";


export class EventGenerator extends BackEndAbstractGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answersAction = await inquirer.prompt(questionCreateEventPart1());
        const answers = await inquirer.prompt(questionCreateEventPart2(answersAction.eventAction, this.config.eventPrefixEntity, this.config.properties));
        const event = new EventDdd(this.data, answersAction.eventAction, answers.eventName, answers.properties);
        this.renderTemplate(event.template);

    }
}


