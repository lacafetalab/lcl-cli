import {BackEndAbstractGenerator, BackEndGeneratorConstructor} from "../BackEndAbstractGenerator";
import {EntityResponse} from "../../../sdk/codeMain/application/EntityResponse";


export class QueryResponseGenerator extends BackEndAbstractGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const entityResponse = new EntityResponse(this.data);
        this.renderTemplate(entityResponse.template);

    }
}


