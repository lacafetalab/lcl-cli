import * as inquirer from 'inquirer';
import {questionGenerateCore} from "../questions";
import {AbstractBackEndGenerator} from "../generator/AbstractBackEndGenerator";
import {Aggregate} from "../../../sdk/codeMain/domain/Aggregate";
import {ValueObject} from "../../../sdk/codeMain/domain/ValueObject";
import {Repository} from "../../../sdk/codeMain/domain/Repository";
import {AggregateGenerator} from "../generator/AggregateGenerator";
import {ValueObjectGenerator} from "../generator/ValueObjectGenerator";
import {RepositoryGenerator} from "../generator/RepositoryGenerator";
import {QueryResponseGenerator} from "../generator/QueryResponseGenerator";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";

export class CoreMenuGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const listCores = ['Aggregate', 'ValueObject', 'Repository', 'QueryResponse'];
        const answers = await inquirer.prompt(questionGenerateCore(listCores));

        if (answers.core.includes('Aggregate')) {
            const aggregateGenerator = new AggregateGenerator(this._params);
            await aggregateGenerator.generate();
        }
        if (answers.core.includes('ValueObject')) {
            const valueObjectGenerator = new ValueObjectGenerator(this._params);
            await valueObjectGenerator.generate();
        }

        if (answers.core.includes('Repository')) {
            const repositoryGenerator = new RepositoryGenerator(this._params);
            await repositoryGenerator.generate();
        }
        if (answers.core.includes('QueryResponse')) {
            const queryResponseGenerator = new QueryResponseGenerator(this._params);
            await queryResponseGenerator.generate();
        }
    }
}


