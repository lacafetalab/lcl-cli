import "jest";
import {Template} from "../../../../src/sdk/AbstractGenerate";
import {Dao} from "../../../../src/sdk/codeMain/infrastructure/persistence/Dao";
import {dataUser, twoEntitiesDependents} from "../../../config/data/data";
import {DataManagement} from "../../../../src/sdk/config/DataManagement";


describe("config value obeject one dao", () => {
    let dao: Dao;
    beforeEach(() => {
        dao = new Dao(new DataManagement([dataUser()]), "User");
    });

    test("dao folder", () => {
        expect(dao.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
    });
    test("dao package", () => {
        expect(dao.package).toEqual("pe.lacafetalab.pao.communication.user.infrastructure.persistence");
    });

});

describe("config value obeject one dao", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const daob = new Dao(new DataManagement([dataUser()]), "User");
        templates = daob.template;
    });
    test("dao template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("dao template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserDao.java");
        expect(templates[0].template).toEqual("main/infrastructure/persistence/dao");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserDao",
            "tableName": "users",
            "package": "pe.lacafetalab.pao.communication.user.infrastructure.persistence",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "entityClass": "User",
            "strPropertiesToDomain": 'new UserId(this.id), new UserName(this.name), new UserLastname(this.lastname), new UserDescription(this.description), new UserBirthdate(this.birthdate)',
            "voProperties": [
                {
                    "className": "UserId",
                    "propertie": "id"
                },
                {
                    "className": "UserName",
                    "propertie": "name"
                },
                {
                    "className": "UserLastname",
                    "propertie": "lastname"
                },
                {
                    "className": "UserDescription",
                    "propertie": "description"
                },
                {
                    "className": "UserBirthdate",
                    "propertie": "birthdate"
                }
            ],
            "tableProperties": [
                {
                    propertie: 'id',
                    isPk: true,
                    type: 'id',
                    primitive: 'String',
                    columnName: 'id'
                },
                {
                    propertie: 'name',
                    isPk: false,
                    type: 'string',
                    primitive: 'String',
                    columnName: 'name'
                },
                {
                    propertie: 'lastname',
                    isPk: false,
                    type: 'text',
                    primitive: 'String',
                    columnName: 'lastname'
                },
                {
                    propertie: 'description',
                    isPk: false,
                    type: 'text',
                    primitive: 'String',
                    columnName: 'description'
                },
                {
                    propertie: 'birthdate',
                    isPk: false,
                    type: 'datetime',
                    primitive: 'Date',
                    columnName: 'birth_date'
                }
            ]
        });
    });
});


describe("config value obeject one dao properties id, name", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const daob = new Dao(new DataManagement([dataUser()]), "User", ['id', 'name']);
        templates = daob.template;
    });
    test("dao template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("dao template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserDao.java");
        expect(templates[0].template).toEqual("main/infrastructure/persistence/dao");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserDao",
            "tableName": "users",
            "package": "pe.lacafetalab.pao.communication.user.infrastructure.persistence",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "entityClass": "User",
            "strPropertiesToDomain": 'new UserId(this.id), new UserName(this.name)',
            "voProperties": [
                {
                    "className": "UserId",
                    "propertie": "id"
                },
                {
                    "className": "UserName",
                    "propertie": "name"
                }
            ],
            "tableProperties": [
                {
                    propertie: 'id',
                    isPk: true,
                    type: 'id',
                    primitive: 'String',
                    columnName: 'id'
                },
                {
                    propertie: 'name',
                    isPk: false,
                    type: 'string',
                    primitive: 'String',
                    columnName: 'name'
                }
            ]
        });
    });
});


describe("dto external data", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const daob = new Dao(new DataManagement(twoEntitiesDependents()), "Address");
        templates = daob.template;
    });
    test("dao template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("dao template id", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/address/infrastructure/persistence");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/address/infrastructure/persistence/AddressDao.java");
        expect(templates[0].template).toEqual("main/infrastructure/persistence/dao");
        expect(templates[0].dataTemplate).toEqual({
            "className": "AddressDao",
            "entityClass": "Address",
            "package": "pe.lacafetalab.pao.communication.address.infrastructure.persistence",
            "packageDomain": "pe.lacafetalab.pao.communication.address.domain",
            "strPropertiesToDomain": "new AddressId(this.id), new UserId(this.userId), new AddressName(this.name)",
            "tableName": "address",
            "voProperties": [
                {
                    "className": "AddressId",
                    "propertie": "id"
                },
                {
                    "className": "UserId",
                    "package": "pe.lacafetalab.pao.communication.user.domain",
                    "propertie": "userId"
                },
                {
                    "className": "AddressName",
                    "propertie": "name"
                }],
            "tableProperties": [
                {
                    "columnName": "id",
                    "isPk": true,
                    "primitive": "String",
                    "propertie": "id",
                    "type": "id"
                },
                {
                    "columnName": "user_id",
                    "isPk": false,
                    "primitive": "String",
                    "propertie": "userId",
                    "type": "id"
                },
                {
                    "columnName": "name",
                    "isPk": false,
                    "primitive": "String",
                    "propertie": "name",
                    "type": "string"
                }
            ]
        });
    });
});