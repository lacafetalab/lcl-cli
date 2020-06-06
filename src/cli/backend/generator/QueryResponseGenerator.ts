import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {EntityResponse} from "../../../sdk/codeMain/application/EntityResponse";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class QueryResponseGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const entityResponse = new EntityResponse(this.data);
        await this.renderTemplate(entityResponse.template);

    }
}


