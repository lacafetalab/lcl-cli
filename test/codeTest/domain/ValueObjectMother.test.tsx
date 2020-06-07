import "jest";
import {ValueObjectMother} from "../../../src/sdk/codeTest/domain/ValueObjectMother";
import {dataUser, twoEntitiesDependents} from "../../config/data/data";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {DataManagement} from "../../../src/sdk/config/DataManagement";

describe("config value obeject one aggregate", () => {
    let valueObjectMother: ValueObjectMother;
    beforeEach(() => {
        valueObjectMother = new ValueObjectMother(new DataManagement([dataUser()]), "User");
    });

    test("valueObjectMother folder", () => {
        expect(valueObjectMother.folder).toEqual("src/communication/test/pe/lacafetalab/pao/communication/user/domain");
    });
    test("valueObjectMother package", () => {
        expect(valueObjectMother.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});

describe("config value obeject one aggregate", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const valueObjectMotherb = new ValueObjectMother(new DataManagement([dataUser()]), "User");
        templates = valueObjectMotherb.template;
    });

    test("aggregate template id", () => {
        expect(templates.length).toEqual(5);
    });

    test("valueObjectMother template id", () => {
        expect(templates[0].folder).toEqual("src/communication/test/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserIdMother.java");
        expect(templates[0].template).toEqual("test/domain/vo_mother/id");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserIdMother",
            "classEntity": "UserId",
            "package": "pe.lacafetalab.pao.communication.user.domain"
        });
    });

    test("valueObjectMother template name", () => {
        expect(templates[1].folder).toEqual("src/communication/test/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[1].file).toEqual("src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserNameMother.java");
        expect(templates[1].template).toEqual("test/domain/vo_mother/string");
        expect(templates[1].dataTemplate).toEqual({
            "className": "UserNameMother",
            "classEntity": "UserName",
            "package": "pe.lacafetalab.pao.communication.user.domain"
        });
    });
});


describe("external value objec tmother", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const valueObjectMotherb = new ValueObjectMother(new DataManagement(twoEntitiesDependents()), "Address");
        templates = valueObjectMotherb.template;
    });

    test("aggregate template id", () => {
        expect(templates.length).toEqual(2);
    });

    test("valueObjectMother template id", () => {
        expect(templates[0].folder).toEqual("src/communication/test/pe/lacafetalab/pao/communication/address/domain");
        expect(templates[0].file).toEqual("src/communication/test/pe/lacafetalab/pao/communication/address/domain/AddressIdMother.java");
        expect(templates[0].template).toEqual("test/domain/vo_mother/id");
        expect(templates[0].dataTemplate).toEqual({
            "className": "AddressIdMother",
            "classEntity": "AddressId",
            "package": "pe.lacafetalab.pao.communication.address.domain"
        });
    });

    test("valueObjectMother template name", () => {
        expect(templates[1].folder).toEqual("src/communication/test/pe/lacafetalab/pao/communication/address/domain");
        expect(templates[1].file).toEqual("src/communication/test/pe/lacafetalab/pao/communication/address/domain/AddressNameMother.java");
        expect(templates[1].template).toEqual("test/domain/vo_mother/string");
        expect(templates[1].dataTemplate).toEqual({
            "className": "AddressNameMother",
            "classEntity": "AddressName",
            "package": "pe.lacafetalab.pao.communication.address.domain"
        });
    });
});

/*
{
  folder: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserIdMother.java',
  template: 'test/domain/vo_mother/id',
  dataTemplate: {
    className: 'UserIdMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserId'
  }
}
{
  folder: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserNameMother.java',
  template: 'test/domain/vo_mother/string',
  dataTemplate: {
    className: 'UserNameMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserName'
  }
}
{
  folder: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserLastnameMother.java',
  template: 'test/domain/vo_mother/text',
  dataTemplate: {
    className: 'UserLastnameMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserLastname'
  }
}
{
  folder: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserDescriptionMother.java',
  template: 'test/domain/vo_mother/text',
  dataTemplate: {
    className: 'UserDescriptionMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserDescription'
  }
}
{
  folder: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserBirthdateMother.java',
  template: 'test/domain/vo_mother/datetime',
  dataTemplate: {
    className: 'UserBirthdateMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserBirthdate'
  }
}
* */