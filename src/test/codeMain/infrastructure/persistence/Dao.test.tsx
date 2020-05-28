import "jest";
import {Template} from "@sdk/AbstractGenerate";
import {Dao} from "@sdk/codeMain/infrastructure/persistence/Dao";
import {complete} from "../../../config/data/data";

let dao: Dao;
describe("config value obeject one dao", () => {
    beforeEach(() => {
        dao = new Dao(complete());
    });

    test("dao folder", () => {
        expect(dao.folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
    });
    test("dao package", () => {
        expect(dao.package).toEqual("pe.lacafetalab.pao.communication.user.infrastructure.persistence");
    });

});
let templates: Template[] = [];
describe("config value obeject one dao", () => {
    beforeEach(() => {
        const daob = new Dao(complete());
        templates = daob.template;
    });
    test("dao template id", () => {
        expect(templates.length).toEqual(1);

    });
    test("dao template id", () => {
        expect(templates[0].folder).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence");
        expect(templates[0].file).toEqual("/application/src/communication/main/pe/lacafetalab/pao/communication/user/infrastructure/persistence/UserDao.java");
        expect(templates[0].template).toEqual("/project/templates/main/infrastructure/persistence/dao");
        expect(templates[0].dataTemplate).toEqual({
            "className": "UserDao",
            "tableName": "users",
            "package": "pe.lacafetalab.pao.communication.user.infrastructure.persistence",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "entityClass": "User",
            "strPropertiesToDomain": 'new UserId(this.id), new UserName(this.name), new UserLastname(this.lastname), new UserDescription(this.description), new UserBirthdate(this.birthdate)',
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