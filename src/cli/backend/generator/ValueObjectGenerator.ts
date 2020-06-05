import {BackEndAbstractGenerator, BackEndGeneratorConstructor} from "../BackEndAbstractGenerator";
import {ValueObject} from "../../../sdk/codeMain/domain/ValueObject";
import {ValueObjectMother} from "../../../sdk/codeTest/domain/ValueObjectMother";


export class ValueObjectGenerator extends BackEndAbstractGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const valueObject = new ValueObject(this.data);
        this.renderTemplate(valueObject.template);

        const valueObjectMother = new ValueObjectMother(this.data);
        this.renderTemplate(valueObjectMother.template);

    }
}


