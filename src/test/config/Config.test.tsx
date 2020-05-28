import {Config} from "@sdk/config/Config";
import "jest";
import {complete} from "./data/data"

let config: Config;
describe("config base one aggregate", () => {
    beforeEach(() => {
        config = new Config(complete());
    });

    test("properties", () => {
        expect(config.properties).toEqual(["id", "name", "lastname", "description", "birthdate"]);
    });

    test("entity", () => {
        expect(config.entity).toEqual("User");
    });

    test("entityClassPropertie", () => {
        expect(config.entityClassPropertie).toEqual("user");
    });

    test("entityIdClass", () => {
        expect(config.entityIdClass).toEqual("UserId");
    });

    test("entityClass", () => {
        expect(config.entityClass).toEqual("User");
    });

    test("value object", () => {
        expect(config.valueObject("id")).toEqual("UserId");
        expect(config.valueObject("name")).toEqual("UserName");
        expect(config.valueObject("lastname")).toEqual("UserLastname");
        expect(config.valueObject("description")).toEqual("UserDescription");
        expect(config.valueObject("birthdate")).toEqual("UserBirthdate");
    });

    test("path", () => {
        expect(config.path).toEqual("/application/src/communication");
    });

    test("package", () => {
        expect(config.package).toEqual("pe.lacafetalab.pao.communication.user");
    });

    test("value object", () => {
        expect(config.valueObjectProperties(["id", "name", "lastname", "description", "birthdate"])).toEqual([
            {"className": 'UserId', "propertie": 'id'},
            {"className": 'UserName', "propertie": 'name'},
            {"className": 'UserLastname', "propertie": 'lastname'},
            {"className": 'UserDescription', "propertie": 'description'},
            {"className": 'UserBirthdate', "propertie": 'birthdate'}
        ]);
    });

});