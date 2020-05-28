import "jest";
import {Repository} from "@sdk/codeMain/domain/Repository";
import {Template} from "@sdk/AbstractGenerate";
import {complete} from "../../config/data/data";

let repository: Repository;
describe("config repository one repository", () => {
    beforeEach(() => {
        repository = new Repository(complete());
    });

    test("repository folder", () => {
        expect(repository.folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain");
    });
    test("repository package", () => {
        expect(repository.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});
let templates: Template[] = [];
describe("config repository one repository", () => {
    beforeEach(() => {
        const repositoryb = new Repository(complete());
        templates = repositoryb.template;
    });
    test("repository template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("repository template id", () => {
        expect(templates[0].folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserRepository.java");
        expect(templates[0].template).toEqual("/project/templates/main/domain/repository");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserRepository",
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "entityClass": "User",
            "entityClassPropertie": "user",
            "entityIdClass": "UserId"
        });
    });
});
/*
{
  folder: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserRepository.java',
  template: '/project/templates/main/domain/repository',
  dataTemplate: {
    className: 'UserRepository',
    entityClass: 'User',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    entityIdClass: 'UserId',
    entityClassPropertie: 'user'
  }
}
* */