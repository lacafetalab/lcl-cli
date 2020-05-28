import "jest";
import {Template} from "@sdk/AbstractGenerate";
import {complete} from "../../../config/data/data";
import {SqlRepository} from "@sdk/codeMain/infrastructure/persistence/SqlRepository";

let sqlRepository: SqlRepository;
describe("config sqlRepository one sqlRepository", () => {
    beforeEach(() => {
        sqlRepository = new SqlRepository(complete());
    });

    test("sqlRepository folder", () => {
        expect(sqlRepository.folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
    });
    test("sqlRepository package", () => {
        expect(sqlRepository.package).toEqual("pe.lacafetalab.pao.communication.user.infrastructure.persistence");
    });

});
let templates: Template[] = [];
describe("config sqlRepository one sqlRepository", () => {
    beforeEach(() => {
        const sqlRepositoryb = new SqlRepository(complete());
        templates = sqlRepositoryb.template;
    });
    test("sqlRepository template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("sqlRepository template id", () => {
        expect(templates[0].folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
        expect(templates[0].file).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserSqlRepository.java");
        expect(templates[0].template).toEqual("/project/templates/main/infrastructure/persistence/sqlRepository");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserSqlRepository",
            "package": "pe.lacafetalab.pao.communication.user.infrastructure.persistence",
            "entityClass": "User",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "entityClassPropertie": "user",
            "entityIdClass": "UserId",
            "entityDaoClass": "UserDao",
            "entityRepositoryClass": "UserRepository"
        });
    });
});
/*
{
  folder: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserRepository.java',
  template: '/project/templates/main/domain/sqlRepository',
  dataTemplate: {
    className: 'UserRepository',
    entityClass: 'User',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    entityIdClass: 'UserId',
    entityClassPropertie: 'user'
  }
}
* */