import "jest";
import {Event} from "../../../src/sdk/codeMain/domain/Event";
import {dataUser} from "../../config/data/data";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {DataManagement} from "../../../src/sdk/config/DataManagement";


describe("Event one aggregate", () => {
    let event: Event;
    beforeEach(() => {
        event = new Event(new DataManagement([dataUser()]),"User", 'created', "comunication.user.created");
    });

    test("event folder", () => {
        expect(event.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
    });
    test("event package", () => {
        expect(event.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });


});

describe("Event one aggregate", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const eventb = new Event(new DataManagement([dataUser()]),"User", 'created', "comunication.user.created");
        templates = eventb.template;
    });
    test("aggregate template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("event template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserCreatedDomainEvent.java");
        expect(templates[0].template).toEqual("main/domain/event");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserCreatedDomainEvent",
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "properties": ["name", "lastname", "description", "birthdate"],
            "eventName": 'comunication.user.created',
            "strProperties": 'name, lastname, description, birthdate',
            "strStringProperties": 'String name, String lastname, String description, String birthdate',
            "strPropertiesEquals": 'Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate)',
            "strPropertiesMap": '(String) body.get("name"), (String) body.get("lastname"), (String) body.get("description"), (String) body.get("birthdate")'

        });
    });
});

describe("Event one aggregate propertie name, lastname", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const eventb = new Event(new DataManagement([dataUser()]),"User", 'created', "comunication.user.created", ['name', 'lastname']);
        templates = eventb.template;
    });
    test("aggregate template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("event template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserCreatedDomainEvent.java");
        expect(templates[0].template).toEqual("main/domain/event");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserCreatedDomainEvent",
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "properties": ["name", "lastname"],
            "eventName": 'comunication.user.created',
            "strProperties": 'name, lastname',
            "strStringProperties": 'String name, String lastname',
            "strPropertiesEquals": 'Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname)',
            "strPropertiesMap": '(String) body.get("name"), (String) body.get("lastname")'

        });
    });
});

describe("Event one aggregate propertie only id", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const eventb = new Event(new DataManagement([dataUser()]),"User", 'created', "comunication.user.created", ['id']);
        templates = eventb.template;
    });
    test("aggregate template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("event template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserCreatedDomainEvent.java");
        expect(templates[0].template).toEqual("main/domain/event");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserCreatedDomainEvent",
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "properties": [],
            "eventName": 'comunication.user.created',
            "strProperties": '',
            "strStringProperties": '',
            "strPropertiesEquals": '',
            "strPropertiesMap": ''

        });
    });
});

/*
{
  folder: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: 'src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserCreatedDomainEvent.java',
  template: 'main/domain/event',
  dataTemplate: {
    className: 'UserCreatedDomainEvent',
    package: 'comunication.user.created',
    eventName: 'comunication.user.created',
    properties: [ 'name', 'lastname', 'description', 'birthdate' ],
    strProperties: 'name, lastname, description, birthdate',
    strStringProperties: 'String name, String lastname, String description, String birthdate',
    strPropertiesEquals: 'Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate)',
    strPropertiesMap: '(String) body.get("name"), (String) body.get("lastname"), (String) body.get("description"), (String) body.get("birthdate")'
  }
}
* */