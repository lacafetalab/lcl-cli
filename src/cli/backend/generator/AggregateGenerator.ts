import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {Event as EventDdd} from "../../../sdk/codeMain/domain/Event";
import {Aggregate} from "../../../sdk/codeMain/domain/Aggregate";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class AggregateGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const aggregate = new Aggregate(this.data);
        await this.renderTemplate(aggregate.template);

        // por defecto se agrega un evento de create al agregate con todas las propiedades
        const event = new EventDdd(this.data, 'created', `${this.config.eventPrefixEntity}created`);
        await this.renderTemplate(event.template);

    }
}


