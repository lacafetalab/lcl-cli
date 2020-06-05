import * as inquirer from 'inquirer';
import {questionAddOrRemovePropertie} from "../questions";
import {AbstractBackEndGenerator} from "../generator/AbstractBackEndGenerator";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";
import {AggregateRefactor} from "../refactor/AggregateRefactor";
import {DaoRefactor} from "../refactor/DaoRefactor";
import {EntityResponseRefactor} from "../refactor/EntityResponseRefactor";


export class AddOrRemoveMenuRefactor extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionAddOrRemovePropertie(this.config.properties));

        const aggregateRefactor = new AggregateRefactor(this._params, answers);
        await aggregateRefactor.generate();

        const daoRefactor = new DaoRefactor(this._params, answers);
        await daoRefactor.generate();

        const entityResponseRefactor = new EntityResponseRefactor(this._params, answers);
        await entityResponseRefactor.generate();
    }
}


