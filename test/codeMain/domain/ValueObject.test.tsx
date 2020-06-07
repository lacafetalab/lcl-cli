import "jest";
import {ValueObject} from "../../../src/sdk/codeMain/domain/ValueObject";
import {dataUser} from "../../config/data/data";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {DataManagement} from "../../../src/sdk/config/DataManagement";


describe("config value obeject one aggregate", () => {
    let valueObject: ValueObject;
    beforeEach(() => {
        valueObject = new ValueObject(new DataManagement([dataUser()]),"User");
    });

    test("valueObject folder", () => {
        expect(valueObject.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
    });
    test("valueObject package", () => {
        expect(valueObject.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});

describe("config value obeject one aggregate", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const valueObjectb = new ValueObject(new DataManagement([dataUser()]),"User");
        templates = valueObjectb.template;
    });

    test("valueObject template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserId.java");
        expect(templates[0].template).toEqual("main/domain/vo/id");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserId",
            "message": {
                "required": null,
                "valid": null
            },
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "type": {
                "default": null,
                "required": true,
                "type": "id",
                "primitive": "String"
            }
        });
    });

    test("valueObject template name", () => {
        expect(templates[1].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[1].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserName.java");
        expect(templates[1].template).toEqual("main/domain/vo/string");
        expect(templates[1].dataTemplate).toEqual({
            "className": "UserName",
            "message": {
                "required": "El nombre es requerido",
                "valid": "El nombre no es un valor válido"
            },
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "type": {
                "default": null,
                "required": true,
                "type": "string",
                "primitive": "String"
            }
        });
    });
});

describe("config message one aggregate", () => {
    let valueObject: ValueObject;
    beforeEach(() => {
        valueObject = new ValueObject(new DataManagement([dataUser()]),"User");
    });

    test("type id no message", () => {
        expect(valueObject.propertieMessage('id')).toEqual({
            "required": null,
            "valid": null
        });
    });

    test("type valid and required message", () => {
        expect(valueObject.propertieMessage('name')).toEqual({
            "required": "El nombre es requerido",
            "valid": "El nombre no es un valor válido"
        });
    });
});

/*
{
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserId.java',
  template: 'main/domain/vo/id',
  dataTemplate: {
    className: 'UserId',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    type: { type: 'id', required: true, default: null },
    message: { required: null, valid: null }
  }
}
{
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserName.java',
  template: 'main/domain/vo/string',
  dataTemplate: {
    className: 'UserName',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    type: { type: 'string', required: true, default: null },
    message: {
      required: 'El nombre es requerido',
      valid: 'El nombre no es un valor válido'
    }
  }
}
{
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserLastname.java',
  template: 'main/domain/vo/text',
  dataTemplate: {
    className: 'UserLastname',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    type: { type: 'text', required: true, default: null },
    message: {
      required: 'El apellido es requerido',
      valid: 'El apellido no es un valor válido'
    }
  }
}
{
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserDescription.java',
  template: 'main/domain/vo/text',
  dataTemplate: {
    className: 'UserDescription',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    type: { type: 'text', required: false, default: null },
    message: { required: null, valid: null }
  }
}
{
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserBirthdate.java',
  template: 'main/domain/vo/datetime',
  dataTemplate: {
    className: 'UserBirthdate',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    type: { type: 'datetime', required: true, default: null },
    message: { required: null, valid: null }
  }
}

* */