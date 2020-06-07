import "jest";
import {Aggregate} from "../../../src/sdk/codeMain/domain/Aggregate";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {dataUser} from "../../config/data/data";
import {DataManagement} from "../../../src/sdk/config/DataManagement";


describe("config value obeject one aggregate", () => {
    let aggregate: Aggregate;
    beforeEach(() => {
        aggregate = new Aggregate(new DataManagement([dataUser()]), "User");
    });

    test("aggregate folder", () => {
        expect(aggregate.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
    });
    test("aggregate package", () => {
        expect(aggregate.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});

describe("config value obeject one aggregate", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const aggregateb = new Aggregate(new DataManagement([dataUser()]), "User");
        templates = aggregateb.template;
    });
    test("aggregate template id", () => {
        expect(templates.length).toEqual(1);
    });
    test("aggregate template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/User.java");
        expect(templates[0].template).toEqual("main/domain/aggregate");
        expect(templates[0].dataTemplate).toEqual({
            "className": "User",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'},
                {"className": 'UserName', "propertie": 'name'},
                {"className": 'UserLastname', "propertie": 'lastname'},
                {"className": 'UserDescription', "propertie": 'description'},
                {"className": 'UserBirthdate', "propertie": 'birthdate'}
            ],
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "strVoProperties": 'UserId id, UserName name, UserLastname lastname, UserDescription description, UserBirthdate birthdate',
            "strPropertiesToString": 'id.toString(), name.toString(), lastname.toString(), description.toString(), birthdate.toString()',
            "strProperties": 'id, name, lastname, description, birthdate',
            "strPropertiesEquals": 'Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate)'
        });
    });
});


describe("config value obeject one aggregate any properties", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const aggregateb = new Aggregate(new DataManagement([dataUser()]), "User", ['id', 'name']);
        templates = aggregateb.template;
    });
    test("aggregate template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("aggregate template id, name", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/User.java");
        expect(templates[0].template).toEqual("main/domain/aggregate");
        expect(templates[0].dataTemplate).toEqual({
            "className": "User",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'},
                {"className": 'UserName', "propertie": 'name'}
            ],
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "strVoProperties": 'UserId id, UserName name',
            "strPropertiesToString": 'id.toString(), name.toString()',
            "strProperties": 'id, name',
            "strPropertiesEquals": 'Objects.equals(id, that.id) && Objects.equals(name, that.name)'
        });
    });
});