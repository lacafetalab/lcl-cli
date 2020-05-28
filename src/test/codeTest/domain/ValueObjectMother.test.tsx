import "jest";
import {ValueObjectMother} from "@sdk/codeTest/domain/ValueObjectMother";
import {Template} from "@sdk/AbstractGenerate";
import {complete} from "../../config/data/data";

let valueObjectMother: ValueObjectMother;
describe("config value obeject one aggregate", () => {
    beforeEach(() => {
        valueObjectMother = new ValueObjectMother(complete());
    });

    test("valueObjectMother folder", () => {
        expect(valueObjectMother.folder).toEqual("/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain");
    });
    test("valueObjectMother package", () => {
        expect(valueObjectMother.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});
let templates: Template[] = [];
describe("config value obeject one aggregate", () => {
    beforeEach(() => {
        const valueObjectMotherb = new ValueObjectMother(complete());
        templates = valueObjectMotherb.template;
    });

    test("valueObjectMother template id", () => {
        expect(templates[0].folder).toEqual("/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserIdMother.java");
        expect(templates[0].template).toEqual("/project/templates/test/domain/vo_mother/id");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserIdMother",
            "classEntity": "UserId",
            "package": "pe.lacafetalab.pao.communication.user.domain"
        });
    });

    test("valueObjectMother template name", () => {
        expect(templates[1].folder).toEqual("/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[1].file).toEqual("/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserNameMother.java");
        expect(templates[1].template).toEqual("/project/templates/test/domain/vo_mother/string");
        expect(templates[1].dataTemplate).toEqual({
            "className": "UserNameMother",
            "classEntity": "UserName",
            "package": "pe.lacafetalab.pao.communication.user.domain"
        });
    });
});

/*
{
  folder: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserIdMother.java',
  template: '/project/templates/test/domain/vo_mother/id',
  dataTemplate: {
    className: 'UserIdMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserId'
  }
}
{
  folder: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserNameMother.java',
  template: '/project/templates/test/domain/vo_mother/string',
  dataTemplate: {
    className: 'UserNameMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserName'
  }
}
{
  folder: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserLastnameMother.java',
  template: '/project/templates/test/domain/vo_mother/text',
  dataTemplate: {
    className: 'UserLastnameMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserLastname'
  }
}
{
  folder: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserDescriptionMother.java',
  template: '/project/templates/test/domain/vo_mother/text',
  dataTemplate: {
    className: 'UserDescriptionMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserDescription'
  }
}
{
  folder: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/test/pe/lacafetalab/pao/communication/user/domain/UserBirthdateMother.java',
  template: '/project/templates/test/domain/vo_mother/datetime',
  dataTemplate: {
    className: 'UserBirthdateMother',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    classEntity: 'UserBirthdate'
  }
}
* */