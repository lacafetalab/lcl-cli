import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {EntityResponse} from "../../../sdk/codeMain/application/EntityResponse";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class QueryResponseGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const entityResponse = new EntityResponse(this._params.dataManagement, this._params.entityCurrent);
        await this.renderTemplate(entityResponse.template);

    }
}


