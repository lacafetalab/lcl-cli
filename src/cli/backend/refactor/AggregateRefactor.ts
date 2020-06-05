import {AbstractBackEndRefactor} from "./AbstractBackEndRefactor";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";
import {Aggregate} from "../../../sdk/codeMain/domain/Aggregate";
import {Event} from "../../../sdk/codeMain/domain/Event";


export class AggregateRefactor extends AbstractBackEndRefactor {
    constructor(params: InterfaceBackEndConstructor, answer: { type: string, properties: string[] }) {
        super(params, answer);
    }

    async generate(): Promise<void> {
        const aggregateOriginal = new Aggregate(this.data, this._originalProperties);
        const aggregateNew = new Aggregate(this.data, this._newProperties);
        this.generateFileAddRemoveProperties(aggregateOriginal.template[0], aggregateNew.template[0]);

        // por defecto se agrega un evento de create al agregate con todas las propiedades
        const eventOriginal = new Event(this.data, 'created', `${this.config.eventPrefixEntity}created`, this._originalProperties);
        const eventNew = new Event(this.data, 'created', `${this.config.eventPrefixEntity}created`, this._newProperties);
        this.generateFileAddRemoveProperties(eventOriginal.template[0], eventNew.template[0]);
    }
}


