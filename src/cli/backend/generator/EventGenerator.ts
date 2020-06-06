import * as inquirer from 'inquirer';
import {questionCreateEventPart1, questionCreateEventPart2} from "../questions";
import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {Event as EventDdd} from "../../../sdk/codeMain/domain/Event";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class EventGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answersAction = await inquirer.prompt(questionCreateEventPart1());
        const answers = await inquirer.prompt(questionCreateEventPart2(answersAction.eventAction, this.config.eventPrefixEntity, this.config.properties));
        const event = new EventDdd(this._params.dataManagement, this._params.entityCurrent, answersAction.eventAction, answers.eventName, answers.properties);
        await this.renderTemplate(event.template);

    }
}


