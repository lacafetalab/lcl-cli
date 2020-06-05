import * as inquirer from 'inquirer';
import {questionGenerateCore} from "../questions";
import {BackEndAbstractGenerator, BackEndGeneratorConstructor} from "../BackEndAbstractGenerator";
import {Event as EventDdd} from "../../../sdk/codeMain/domain/Event";
import {Aggregate} from "../../../sdk/codeMain/domain/Aggregate";
import {ValueObject} from "../../../sdk/codeMain/domain/ValueObject";
import {ValueObjectMother} from "../../../sdk/codeTest/domain/ValueObjectMother";
import {Repository} from "../../../sdk/codeMain/domain/Repository";
import {Dao} from "../../../sdk/codeMain/infrastructure/persistence/Dao";
import {JpaRepository} from "../../../sdk/codeMain/infrastructure/persistence/JpaRepository";
import {SqlRepository} from "../../../sdk/codeMain/infrastructure/persistence/SqlRepository";
import {EntityResponse} from "../../../sdk/codeMain/application/EntityResponse";

const s = require("underscore.string");

export class CoreMenuGenerator extends BackEndAbstractGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const listCores = ['Aggregate', 'ValueObject', 'Repository', 'QueryResponse'];
        const answers = await inquirer.prompt(questionGenerateCore(listCores));
        if (answers.core.includes('Aggregate')) {
            const aggregate = new Aggregate(this.data);
            this.renderTemplate(aggregate.template);

            // por defecto se agrega un evento de create al agregate con todas las propiedades
            const event = new EventDdd(this.data, 'created', `${this.config.entityClassPropertie}.created`);
            this.renderTemplate(event.template);
        }
        if (answers.core.includes('ValueObject')) {
            const valueObject = new ValueObject(this.data);
            const valueObjectMother = new ValueObjectMother(this.data);
            this.renderTemplate(valueObject.template);

            this.renderTemplate(valueObjectMother.template);
        }


        if (answers.core.includes('Repository')) {
            const repository = new Repository(this.data);
            const dao = new Dao(this.data);
            const jpaRepository = new JpaRepository(this.data);
            const sqlRepository = new SqlRepository(this.data);

            this.renderTemplate(repository.template);
            this.renderTemplate(dao.template);
            this.renderTemplate(jpaRepository.template);
            this.renderTemplate(sqlRepository.template);
        }
        if (answers.core.includes('QueryResponse')) {
            const entityResponse = new EntityResponse(this.data);
            this.renderTemplate(entityResponse.template);
        }
    }
}


