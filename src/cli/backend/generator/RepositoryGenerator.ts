import {AbstractBackEndGenerator} from "./AbstractBackEndGenerator";
import {Repository} from "../../../sdk/codeMain/domain/Repository";
import {Dao} from "../../../sdk/codeMain/infrastructure/persistence/Dao";
import {JpaRepository} from "../../../sdk/codeMain/infrastructure/persistence/JpaRepository";
import {SqlRepository} from "../../../sdk/codeMain/infrastructure/persistence/SqlRepository";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";


export class RepositoryGenerator extends AbstractBackEndGenerator {
    constructor(params: InterfaceBackEndConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const repository = new Repository(this._params.dataManagement, this._params.entityCurrent);
        await this.renderTemplate(repository.template);

        const dao = new Dao(this._params.dataManagement, this._params.entityCurrent);
        await this.renderTemplate(dao.template);

        const jpaRepository = new JpaRepository(this._params.dataManagement, this._params.entityCurrent);
        await this.renderTemplate(jpaRepository.template);

        const sqlRepository = new SqlRepository(this._params.dataManagement, this._params.entityCurrent);
        await this.renderTemplate(sqlRepository.template);

    }
}


