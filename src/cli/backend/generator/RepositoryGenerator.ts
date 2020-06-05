import {BackEndAbstractGenerator, BackEndGeneratorConstructor} from "../BackEndAbstractGenerator";
import {Repository} from "../../../sdk/codeMain/domain/Repository";
import {Dao} from "../../../sdk/codeMain/infrastructure/persistence/Dao";
import {JpaRepository} from "../../../sdk/codeMain/infrastructure/persistence/JpaRepository";
import {SqlRepository} from "../../../sdk/codeMain/infrastructure/persistence/SqlRepository";


export class RepositoryGenerator extends BackEndAbstractGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const repository = new Repository(this.data);
        this.renderTemplate(repository.template);

        const dao = new Dao(this.data);
        this.renderTemplate(dao.template);

        const jpaRepository = new JpaRepository(this.data);
        this.renderTemplate(jpaRepository.template);

        const sqlRepository = new SqlRepository(this.data);
        this.renderTemplate(sqlRepository.template);

    }
}


