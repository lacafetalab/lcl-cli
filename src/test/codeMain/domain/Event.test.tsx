import "jest";
import {Event} from "@sdk/codeMain/domain/Event";
import {complete} from "../../config/data/data";
import {Template} from "@sdk/AbstractGenerate";

let event: Event;
describe("Event one aggregate", () => {
    beforeEach(() => {
        event = new Event(complete());
    });

    test("event folder", () => {
        expect(event.folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain");
    });
    test("event package", () => {
        expect(event.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});
let templates: Template[] = [];
describe("Event one aggregate", () => {
    beforeEach(() => {
        const eventb = new Event(complete());
        templates = eventb.template;
    });

    test("event template id", () => {
        expect(templates[0].folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserCreatedDomainEvent.java");
        expect(templates[0].template).toEqual("/project/templates/main/domain/event");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserCreatedDomainEvent",
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "properties": ["name","lastname","description","birthdate"],
            "eventName": 'comunication.user.created',
            "strProperties": 'name, lastname, description, birthdate',
            "strStringProperties": 'String name, String lastname, String description, String birthdate',
            "strPropertiesEquals": 'Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate)',
            "strPropertiesMap": '(String) body.get("name"), (String) body.get("lastname"), (String) body.get("description"), (String) body.get("birthdate")'

        });
    });
});

/*
{
  folder: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain',
  file: '/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain/UserCreatedDomainEvent.java',
  template: '/project/templates/main/domain/event',
  dataTemplate: {
    className: 'UserCreatedDomainEvent',
    package: 'pe.lacafetalab.pao.communication.user.domain',
    eventName: 'comunication.user.created',
    properties: [ 'name', 'lastname', 'description', 'birthdate' ],
    strProperties: 'name, lastname, description, birthdate',
    strStringProperties: 'String name, String lastname, String description, String birthdate',
    strPropertiesEquals: 'Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate)',
    strPropertiesMap: '(String) body.get("name"), (String) body.get("lastname"), (String) body.get("description"), (String) body.get("birthdate")'
  }
}
* */