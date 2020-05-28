import "jest";
import {JpaRepository} from "@sdk/codeMain/infrastructure/persistence/JpaRepository";
import {Template} from "@sdk/AbstractGenerate";
import {complete} from "../../../config/data/data";

let jpaRepository: JpaRepository;
describe("config jpaRepository one jpaRepository", () => {
    beforeEach(() => {
        jpaRepository = new JpaRepository(complete());
    });

    test("jpaRepository folder", () => {
        expect(jpaRepository.folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
    });
    test("jpaRepository package", () => {
        expect(jpaRepository.package).toEqual("pe.lacafetalab.pao.communication.user.infrastructure.persistence");
    });

});
let templates: Template[] = [];
describe("config jpaRepository one jpaRepository", () => {
    beforeEach(() => {
        const jpaRepositoryb = new JpaRepository(complete());
        templates = jpaRepositoryb.template;
    });
    test("jpaRepository template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("jpaRepository template id", () => {
        expect(templates[0].folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
        expect(templates[0].file).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserJpaRepository.java");
        expect(templates[0].template).toEqual("/project/templates/main/infrastructure/persistence/jpaRepository");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserJpaRepository",
            "package": "pe.lacafetalab.pao.communication.user.infrastructure.persistence",
            "entityDaoClass":"UserDao"
        });
    });
});
/*
{
  folder: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence',
  file: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserJpaRepository.java',
  template: '/project/templates/main/infrastructure/persistence/jpaRepository',
  dataTemplate: {
    className: 'UserJpaRepository',
    entityDaoClass: 'UserDao',
    package: 'pe.lacafetalab.pao.communication.user.infrastructure.persistence'
  }
}
* */