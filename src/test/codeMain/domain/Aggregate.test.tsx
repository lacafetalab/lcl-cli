import "jest";
import {Aggregate} from "@sdk/codeMain/domain/Aggregate";
import {Template} from "@sdk/AbstractGenerate";
import {complete} from "../../config/data/data";

let aggregate: Aggregate;
describe("config value obeject one aggregate", () => {
    beforeEach(() => {
        aggregate = new Aggregate(complete());
    });

    test("aggregate folder", () => {
        expect(aggregate.folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain");
    });
    test("aggregate package", () => {
        expect(aggregate.package).toEqual("pe.lacafetalab.pao.communication.user.domain");
    });

});
let templates: Template[] = [];
describe("config value obeject one aggregate", () => {
    beforeEach(() => {
        const aggregateb = new Aggregate(complete());
        templates = aggregateb.template;
    });
    test("aggregate template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("aggregate template id", () => {
        expect(templates[0].folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain");
        expect(templates[0].file).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/domain/User.java");
        expect(templates[0].template).toEqual("/project/templates/main/domain/aggregate");
        expect(templates[0].dataTemplate).toEqual({
            "className": "User",
            "voProperties": [
                { "className": 'UserId', "propertie": 'id' },
                { "className": 'UserName', "propertie": 'name' },
                { "className": 'UserLastname', "propertie": 'lastname' },
                { "className": 'UserDescription', "propertie": 'description' },
                { "className": 'UserBirthdate', "propertie": 'birthdate' }
            ],
            "package": "pe.lacafetalab.pao.communication.user.domain",
            "strVoProperties": 'UserId id, UserName name, UserLastname lastname, UserDescription description, UserBirthdate birthdate',
            "strPropertiesToString": 'id.toString(), name.toString(), lastname.toString(), description.toString(), birthdate.toString()',
            "strProperties": 'id, name, lastname, description, birthdate',
            "strPropertiesEquals": 'Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate)'
        });
    });
});