import "jest";
import {Template} from "../../../../src/sdk/AbstractGenerate";
import {dataUser} from "../../../config/data/data";
import {SqlRepository} from "../../../../src/sdk/codeMain/infrastructure/persistence/SqlRepository";
import {DataManagement} from "../../../../src/sdk/config/DataManagement";

let sqlRepository: SqlRepository;
describe("config sqlRepository one sqlRepository", () => {
    beforeEach(() => {
        sqlRepository = new SqlRepository(new DataManagement([dataUser()]), "User");
    });

    test("sqlRepository folder", () => {
        expect(sqlRepository.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
    });
    test("sqlRepository package", () => {
        expect(sqlRepository.package).toEqual("pe.lacafetalab.pao.communication.user.infrastructure.persistence");
    });

});
let templates: Template[] = [];
describe("config sqlRepository one sqlRepository", () => {
    beforeEach(() => {
        const sqlRepositoryb = new SqlRepository(new DataManagement([dataUser()]), "User");
        templates = sqlRepositoryb.template;
    });
    test("sqlRepository template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("sqlRepository template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserSqlRepository.java");
        expect(templates[0].template).toEqual("main/infrastructure/persistence/sqlRepository");
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
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserRepository.java',
  template: 'main/domain/sqlRepository',
  dataTemplate: {
    className: 'UserRepository',
    entityClass: 'User',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    entityIdClass: 'UserId',
    entityClassPropertie: 'user'
  }
}
* */