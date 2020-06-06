import {Config} from "../../src/sdk/config/Config";
import "jest";
import {dataUser} from "./data/data"
import {ConfigValueObject} from "../../src/sdk/config/ConfigValueObject";
import {DataManagement} from "../../src/sdk/config/DataManagement";

let config: ConfigValueObject;
describe("config value obeject one aggregate", () => {
    beforeEach(() => {
        config = new ConfigValueObject(new DataManagement([dataUser()]),"User");
    });

    test("type id inline", () => {
        expect(config.propertieType('id')).toEqual({
            type: "id",
            primitive: "String",
            required: true,
            default: null
        });
    });
    test("type string inline", () => {
        expect(config.propertieType('name')).toEqual({
            type: "string",
            primitive: "String",
            required: true,
            default: null
        });
    });
    test("type text inline", () => {
        expect(config.propertieType('lastname')).toEqual({
            type: "text",
            primitive: "String",
            required: true,
            default: null
        });
    });
    test("types text object", () => {
        expect(config.propertieType("description")).toEqual({
            type: "text",
            primitive: "String",
            required: false,
            default: null
        });
    });
    test("type datetime inline", () => {
        expect(config.propertieType('birthdate')).toEqual({
            type: "datetime",
            primitive: "Date",
            required: true,
            default: null
        });
    });
});

describe("config message one aggregate", () => {
    beforeEach(() => {
        config = new ConfigValueObject(new DataManagement([dataUser()]),"User");
    });

    test("type id no message", () => {
        expect(config.propertieMessage('id')).toEqual({
            "required": null,
            "valid": null
        });
    });

    test("type valid and required message", () => {
        expect(config.propertieMessage('name')).toEqual({
            "required": "El nombre es requerido",
            "valid": "El nombre no es un valor válido"
        });
    });
});