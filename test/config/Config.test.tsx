import {Config} from "../../src/sdk/config/Config";
import "jest";
import {dataUser, withoutEvent} from "./data/data"
import {DataManagement} from "../../src/sdk/config/DataManagement";


describe("config base one aggregate", () => {
    let config: Config;
    beforeEach(() => {
        config = new Config(new DataManagement([dataUser()]), "User");
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
        expect(config.path).toEqual("src/communication");
    });

    test("package", () => {
        expect(config.package).toEqual("pe.lacafetalab.pao.communication.user");
    });

    test("event prefix", () => {
        expect(config.eventPrefixEntity).toEqual("comunication.user.");
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


describe("config base one aggregate", () => {
    let config: Config;
    beforeEach(() => {
        config = new Config(new DataManagement([withoutEvent()]), "User");
    });

    test("event prefix", () => {
        expect(config.eventPrefixEntity).toEqual("user.");
    });

});


// describe("config base one aggregate entidades dependientes", () => {
//     let config: Config;
//     beforeEach(() => {
//         config = new Config(new DataManagement(twoEntitiesDependents()), "Address");
//     });
//
//     test("properties", () => {
//         expect(config.properties).toEqual(["id", "userId", "name"]);
//     });
//
//     test("value object", () => {
//         expect(config.valueObject("id")).toEqual("AddressId");
//         expect(config.valueObject("userId")).toEqual("UserId");
//         expect(config.valueObject("name")).toEqual("AddressName");
//     });
//
//     test("value object", () => {
//         expect(config.valueObjectProperties(["id", "userId", "name"])).toEqual([
//             {"className": 'AddressId', "propertie": 'id'},
//             {"className": 'UserId', "propertie": 'userId', 'package': 'pe.lacafetalab.pao.communication.user.domain'},
//             {"className": 'AddressName', "propertie": 'name'}
//         ]);
//     });
//
// });
