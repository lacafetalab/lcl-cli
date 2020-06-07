import "jest";
import {AbstractGenerate, Template} from "../src/sdk/AbstractGenerate";
import {InterfaceValueObjectPropertie} from "../src/sdk/config/ValueObjectPropertie";

class GenerateImplement extends AbstractGenerate {
    get template(): Template[] {
        return [];
    }
}

let generateImplement: GenerateImplement;
describe("AbstractGenerate str", () => {
    beforeEach(() => {
        generateImplement = new GenerateImplement();
    });
    test("AbstractGenerate str properties", () => {
        expect(generateImplement.strProperties(['id', 'name', 'lastname'])).toEqual("id, name, lastname");
    });
    test("AbstractGenerate str one propertie", () => {
        expect(generateImplement.strProperties(['id'])).toEqual("id");
    });
    test("AbstractGenerate str one empty", () => {
        expect(generateImplement.strProperties([])).toEqual("");
    });

    test("AbstractGenerate str properties prefix", () => {
        expect(generateImplement.strProperties(['id', 'name', 'lastname'], "String")).toEqual("String id, String name, String lastname");
    });
    test("AbstractGenerate str one propertie prefix", () => {
        expect(generateImplement.strProperties(['id'], "String")).toEqual("String id");
    });
});

describe("AbstractGenerate strEquals", () => {
    beforeEach(() => {
        generateImplement = new GenerateImplement();
    });
    test("AbstractGenerate strEquals properties", () => {
        expect(generateImplement.strPropertiesEquals(['id', 'name', 'lastname'])).toEqual("Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname)");
    });
    test("AbstractGenerate strEquals one propertie", () => {
        expect(generateImplement.strPropertiesEquals(['id'])).toEqual("Objects.equals(id, that.id)");
    });
    test("AbstractGenerate strEquals one empty", () => {
        expect(generateImplement.strPropertiesEquals([])).toEqual("");
    });
});

describe("AbstractGenerate str to string", () => {
    beforeEach(() => {
        generateImplement = new GenerateImplement();
    });
    test("AbstractGenerate str properties", () => {
        expect(generateImplement.strPropertiesToString(['id', 'name', 'lastname'])).toEqual("id.toString(), name.toString(), lastname.toString()");
    });
    test("AbstractGenerate str one propertie", () => {
        expect(generateImplement.strPropertiesToString(['id'])).toEqual("id.toString()");
    });
    test("AbstractGenerate str one empty", () => {
        expect(generateImplement.strPropertiesToString([])).toEqual("");
    });

});

describe("AbstractGenerate str vo properties", () => {


    beforeEach(() => {
        generateImplement = new GenerateImplement();
    });
    test("AbstractGenerate str properties", () => {
        const voProperties: InterfaceValueObjectPropertie[] = [
            {className: 'UserId', propertie: 'id'},
            {className: 'UserName', propertie: 'name'},
            {className: 'UserLastname', propertie: 'lastname'},
        ];
        expect(generateImplement.strVoProperties(voProperties)).toEqual("UserId id, UserName name, UserLastname lastname");
    });
    test("AbstractGenerate str one propertie", () => {
        const voProperties: InterfaceValueObjectPropertie[] = [
            {className: 'UserId', propertie: 'id'}
        ];
        expect(generateImplement.strVoProperties(voProperties)).toEqual("UserId id");
    });
    test("AbstractGenerate str one empty", () => {
        const voProperties: InterfaceValueObjectPropertie[] = [];
        expect(generateImplement.strVoProperties(voProperties)).toEqual("");
    });

})
;


