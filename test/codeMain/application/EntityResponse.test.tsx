import "jest";
import {EntityResponse} from "../../../src/sdk/codeMain/application/EntityResponse";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {dataUser} from "../../config/data/data";
import {DataManagement} from "../../../src/sdk/config/DataManagement";


describe("config value obeject one entityResponse", () => {
    let entityResponse: EntityResponse;
    beforeEach(() => {
        entityResponse = new EntityResponse(new DataManagement([dataUser()]),"User");
    });

    test("entityResponse folder", () => {
        expect(entityResponse.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application");
    });
    test("entityResponse package", () => {
        expect(entityResponse.package).toEqual("pe.lacafetalab.pao.communication.user.application");
    });

});

describe("config value obeject one entityResponse", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const entityResponseb = new EntityResponse(new DataManagement([dataUser()]),"User");
        templates = entityResponseb.template;
    });
    test("entityResponse template id", () => {
        expect(templates.length).toEqual(2);

    });
    test("entityResponse entity", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/UserResponse.java");
        expect(templates[0].template).toEqual("main/application/response");
        expect(templates[0].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application",
            "className": "UserResponse",
            "voProperties": [
                { "className": 'UserId', "propertie": 'id' },
                { "className": 'UserName', "propertie": 'name' },
                { "className": 'UserLastname', "propertie": 'lastname' },
                { "className": 'UserDescription', "propertie": 'description' },
                { "className": 'UserBirthdate', "propertie": 'birthdate' }
            ],
            "strStringProperties": 'String id, String name, String lastname, String description, String birthdate',
            "strProperties": 'id, name, lastname, description, birthdate',
            "strPropertiesEquals": 'Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate)',
            "strPropertiesEntityToString": 'user.id().toString(), user.name().toString(), user.lastname().toString(), user.description().toString(), user.birthdate().toString()',
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "entityClass": "User",
            "entityClassPropertie": "user",
        });
    });

    test("entityResponse list entity", () => {
        expect(templates[1].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application");
        expect(templates[1].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/ListUserResponse.java");
        expect(templates[1].template).toEqual("main/application/listResponse");
        expect(templates[1].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application",
            "className": "ListUserResponse",
            "entityResponseClass": 'UserResponse',
            "entityResponseClassPropertie": 'listUserResponse',
        });
    });
});

describe("config value obeject one entityResponse propertie id, name", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const entityResponseb = new EntityResponse(new DataManagement([dataUser()]),"User",['id','name']);
        templates = entityResponseb.template;
    });
    test("entityResponse template id", () => {
        expect(templates.length).toEqual(2);

    });
    test("entityResponse entity", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/UserResponse.java");
        expect(templates[0].template).toEqual("main/application/response");
        expect(templates[0].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application",
            "className": "UserResponse",
            "voProperties": [
                { "className": 'UserId', "propertie": 'id' },
                { "className": 'UserName', "propertie": 'name' }
            ],
            "strStringProperties": 'String id, String name',
            "strProperties": 'id, name',
            "strPropertiesEquals": 'Objects.equals(id, that.id) && Objects.equals(name, that.name)',
            "strPropertiesEntityToString": 'user.id().toString(), user.name().toString()',
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "entityClass": "User",
            "entityClassPropertie": "user",
        });
    });

    test("entityResponse list entity", () => {
        expect(templates[1].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application");
        expect(templates[1].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/ListUserResponse.java");
        expect(templates[1].template).toEqual("main/application/listResponse");
        expect(templates[1].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application",
            "className": "ListUserResponse",
            "entityResponseClass": 'UserResponse',
            "entityResponseClassPropertie": 'listUserResponse',
        });
    });
});