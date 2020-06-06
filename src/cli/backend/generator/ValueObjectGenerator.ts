import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {ValueObject} from "../../../sdk/codeMain/domain/ValueObject";
import {ValueObjectMother} from "../../../sdk/codeTest/domain/ValueObjectMother";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class ValueObjectGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const valueObject = new ValueObject(this._params.dataManagement, this._params.entityCurrent);
        await this.renderTemplate(valueObject.template);

        const valueObjectMother = new ValueObjectMother(this._params.dataManagement, this._params.entityCurrent);
        await this.renderTemplate(valueObjectMother.template);

    }
}


