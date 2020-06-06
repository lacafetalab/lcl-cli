import "jest";
import {twoCompletedComfig} from "./data/data"
import {DataManagement} from "../../src/sdk/config/DataManagement";
import {Config} from "../../src/sdk/config/Config";


describe("DataManagement two data ok", () => {
    let dataManagement: DataManagement;
    beforeEach(() => {
        dataManagement = new DataManagement(twoCompletedComfig());
    });

    test("length", () => {
        expect(2).toEqual(dataManagement.length);
    });

    test("get data by entity name UserOne", () => {
        const dataOne = dataManagement.getData("UserOne");
        expect(dataOne).toBeDefined();
        expect(dataOne.name).toEqual("UserOne");
    });

    test("get data by entity name UserTwo", () => {
        const userTwo = dataManagement.getData("UserTwo");
        expect(userTwo).toBeDefined();
        expect(userTwo.name).toEqual("UserTwo");
    });

    test("get data by entity name exception", () => {
        expect(() => {
            const userNoExist = dataManagement.getData("UserNoExist");
        }).toThrow();
    });

    test("get list entitys", () => {
        expect(["UserOne", "UserTwo"]).toEqual(dataManagement.entities);
    });

    test("generate connfig UserOne", () => {
        const configOne: Config = new Config(dataManagement, "UserOne");
        expect(configOne.entityClassPropertie).toEqual("userOne");
    });

    test("generate connfig no existe", () => {
        expect(() => {
            const userNoExist: Config = new Config(dataManagement, "UserNoExist");
        }).toThrow();
    });

});