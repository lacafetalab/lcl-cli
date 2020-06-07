import {Config} from "../../src/sdk/config/Config";
import "jest";
import {dataUser, twoEntitiesDependents} from "./data/data"

import {DataManagement} from "../../src/sdk/config/DataManagement";
import {ValueObjectPropertie} from "../../src/sdk/config/ValueObjectPropertie";


describe("config value obeject one aggregate", () => {
    let valueObject: ValueObjectPropertie;
    beforeEach(() => {
        valueObject = new ValueObjectPropertie(new DataManagement([dataUser()]), "User");
    });

    test("type id inline", () => {
        expect(valueObject.propertieValue('id')).toEqual({
            type: "id",
            primitive: "String",
            required: true,
            default: null,
            isExternal: false
        });
    });
    test("type string inline", () => {
        expect(valueObject.propertieValue('name')).toEqual({
            type: "string",
            primitive: "String",
            required: true,
            default: null,
            isExternal: false
        });
    });
    test("type text inline", () => {
        expect(valueObject.propertieValue('lastname')).toEqual({
            type: "text",
            primitive: "String",
            required: true,
            default: null,
            isExternal: false
        });
    });
    test("types text object", () => {
        expect(valueObject.propertieValue("description")).toEqual({
            type: "text",
            primitive: "String",
            required: false,
            default: null,
            isExternal: false
        });
    });
    test("type datetime inline", () => {
        expect(valueObject.propertieValue('birthdate')).toEqual({
            type: "datetime",
            primitive: "Date",
            required: true,
            default: null,
            isExternal: false
        });
    });
});


describe("list properties one aggregate", () => {
    let valueObject: ValueObjectPropertie;
    beforeEach(() => {
        valueObject = new ValueObjectPropertie(new DataManagement([dataUser()]), "User");
    });

    test("type id inline", () => {
        expect(valueObject.properties).toEqual([
            "id",
            "name",
            "lastname",
            "description",
            "birthdate"
        ]);
    });
});


describe("ValueObjectPropertie entidades dependientes", () => {
    let valueObject: ValueObjectPropertie;
    beforeEach(() => {
        valueObject = new ValueObjectPropertie(new DataManagement(twoEntitiesDependents()), "Address");
    });

    test("properties", () => {
        expect(valueObject.properties).toEqual(["id", "userId", "name"]);
    });

    test("type id inline", () => {
        expect(valueObject.propertieValue('id')).toEqual({
            type: "id",
            primitive: "String",
            required: true,
            default: null,
            isExternal: false
        });
    });
    test("type string inline", () => {
        expect(valueObject.propertieValue('userId')).toEqual({
            type: "id",
            primitive: "String",
            required: true,
            default: null,
            externalEntity: "User",
            externalPropertie: "id",
            isExternal: true
        });
    });
    test("type string inline", () => {
        expect(valueObject.propertieValue('name')).toEqual({
            type: "string",
            primitive: "String",
            required: true,
            default: null,
            isExternal: false
        });
    });

    test("value object", () => {
        expect(valueObject.valueObject("id")).toEqual("AddressId");
        expect(valueObject.valueObject("userId")).toEqual("UserId");
        expect(valueObject.valueObject("name")).toEqual("AddressName");
    });

    test("value object", () => {
        expect(valueObject.valueObjectProperties(["id", "userId", "name"])).toEqual([
            {"className": 'AddressId', "propertie": 'id'},
            {"className": 'UserId', "propertie": 'userId', 'package': 'pe.lacafetalab.pao.communication.user.domain'},
            {"className": 'AddressName', "propertie": 'name'}
        ]);
    });

});


describe("ValueObjectPropertie entidades dependientes", () => {
    let valueObject: ValueObjectPropertie;
    beforeEach(() => {
        valueObject = new ValueObjectPropertie(new DataManagement(twoEntitiesDependents()), "Address");
    });

    test("properties depends", () => {
        expect(valueObject.isExternal("id")).toEqual(false);
        expect(valueObject.isExternal("userId")).toEqual(true);
    });

});