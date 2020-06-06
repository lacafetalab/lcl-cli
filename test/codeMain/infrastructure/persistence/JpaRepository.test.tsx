import "jest";
import {JpaRepository} from "../../../../src/sdk/codeMain/infrastructure/persistence/JpaRepository";
import {Template} from "../../../../src/sdk/AbstractGenerate";
import {dataUser} from "../../../config/data/data";
import {DataManagement} from "../../../../src/sdk/config/DataManagement";

let jpaRepository: JpaRepository;
describe("config jpaRepository one jpaRepository", () => {
    beforeEach(() => {
        jpaRepository = new JpaRepository(new DataManagement([dataUser()]), "User");
    });

    test("jpaRepository folder", () => {
        expect(jpaRepository.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
    });
    test("jpaRepository package", () => {
        expect(jpaRepository.package).toEqual("pe.lacafetalab.pao.communication.user.infrastructure.persistence");
    });

});
let templates: Template[] = [];
describe("config jpaRepository one jpaRepository", () => {
    beforeEach(() => {
        const jpaRepositoryb = new JpaRepository(new DataManagement([dataUser()]), "User");
        templates = jpaRepositoryb.template;
    });
    test("jpaRepository template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("jpaRepository template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserJpaRepository.java");
        expect(templates[0].template).toEqual("main/infrastructure/persistence/jpaRepository");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserJpaRepository",
            "package": "pe.lacafetalab.pao.communication.user.infrastructure.persistence",
            "entityDaoClass": "UserDao"
        });
    });
});
/*
{
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserJpaRepository.java',
  template: 'main/infrastructure/persistence/jpaRepository',
  dataTemplate: {
    className: 'UserJpaRepository',
    entityDaoClass: 'UserDao',
    package: 'pe.lacafetalab.pao.communication.user.infrastructure.persistence'
  }
}
* */