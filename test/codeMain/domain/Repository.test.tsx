import "jest";
import {Repository} from "../../../src/sdk/codeMain/domain/Repository";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {dataUser} from "../../config/data/data";
import {DataManagement} from "../../../src/sdk/config/DataManagement";


describe("config repository one repository", () => {
    let repository: Repository;
    beforeEach(() => {
        repository = new Repository(new DataManagement([dataUser()]),"User");
    });

    test("repository folder", () => {
        expect(repository.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
    });
    test("repository package", () => {
        expect(repository.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});

describe("config repository one repository", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const repositoryb = new Repository(new DataManagement([dataUser()]),"User");
        templates = repositoryb.template;
    });
    test("repository template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("repository template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserRepository.java");
        expect(templates[0].template).toEqual("main/domain/repository");
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
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserRepository.java',
  template: 'main/domain/repository',
  dataTemplate: {
    className: 'UserRepository',
    entityClass: 'User',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    entityIdClass: 'UserId',
    entityClassPropertie: 'user'
  }
}
* */