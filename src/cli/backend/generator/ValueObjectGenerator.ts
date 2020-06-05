import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {ValueObject} from "../../../sdk/codeMain/domain/ValueObject";
import {ValueObjectMother} from "../../../sdk/codeTest/domain/ValueObjectMother";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class ValueObjectGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const valueObject = new ValueObject(this.data);
        this.renderTemplate(valueObject.template);

        const valueObjectMother = new ValueObjectMother(this.data);
        this.renderTemplate(valueObjectMother.template);

    }
}


