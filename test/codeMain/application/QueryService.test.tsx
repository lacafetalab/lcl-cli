import "jest";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {dataUser} from "../../config/data/data";
import {QueryService} from "../../../src/sdk/codeMain/application/QueryService";
import {DataManagement} from "../../../src/sdk/config/DataManagement";


describe("queryService parametos por defecto", () => {
    let queryService: QueryService;
    beforeEach(() => {
        queryService = new QueryService(new DataManagement([dataUser()]),"User", "findById", "entity");
    });
    test("queryService folder", () => {
        expect(queryService.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id");
    });
    test("queryService package", () => {
        expect(queryService.package).toEqual("pe.lacafetalab.pao.communication.user.application.find_by_id");
    });
    test("queryService properties", () => {
        expect(queryService.properties).toEqual(['id', 'name', 'lastname', 'description', 'birthdate']);
    });
    test("queryService template", () => {
        expect(queryService.returnType).toEqual("entity");
    });
    test("queryService template", () => {
        expect(queryService.templateService).toEqual("none");
    });
});

describe("queryService parametos propertie id, name", () => {
    let queryService: QueryService;
    beforeEach(() => {
        queryService = new QueryService(new DataManagement([dataUser()]),"User", "findById", "entity", ['id', 'name']);
    });
    test("queryService properties", () => {
        expect(queryService.properties).toEqual(['id', 'name']);
    });
    test("queryService template", () => {
        expect(queryService.templateService).toEqual("none");
    });
});

describe("queryService parametos propertie id, name y templateName", () => {
    let queryService: QueryService;
    beforeEach(() => {
        queryService = new QueryService(new DataManagement([dataUser()]),"User", "findById", "entity", ['id', 'name'], "findById");
    });
    test("queryService properties", () => {
        expect(queryService.properties).toEqual(['id', 'name']);
    });
    test("queryService template", () => {
        expect(queryService.templateService).toEqual("findById");
    });
});

describe("queryService parametos propertie null y  templateName", () => {
    let queryService: QueryService;
    beforeEach(() => {
        queryService = new QueryService(new DataManagement([dataUser()]),"User", "findById", "entity", null, "findById");
    });
    test("queryService properties", () => {
        expect(queryService.properties).toEqual(['id', 'name', 'lastname', 'description', 'birthdate']);
    });
    test("queryService template", () => {
        expect(queryService.templateService).toEqual("findById");
    });
});

describe("queryService parametos por defecto, servicio en mayuscula", () => {
    let queryService: QueryService;
    beforeEach(() => {
        queryService = new QueryService(new DataManagement([dataUser()]),"User", "FindById", "entity");
    });
    test("queryService folder", () => {
        expect(queryService.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id");
    });
    test("queryService package", () => {
        expect(queryService.package).toEqual("pe.lacafetalab.pao.communication.user.application.find_by_id");
    });
});

describe("config value obeject one queryService", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const queryServiceb = new QueryService(new DataManagement([dataUser()]),"User", "findById", "entity", ['id'], "findById");
        templates = queryServiceb.template;
    });
    test("queryService template id", () => {
        expect(templates.length).toEqual(3);

    });
    test("queryService template service", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id/FindByIdUser.java");
        expect(templates[0].template).toEqual("main/application/query/service");
        expect(templates[0].dataTemplate).toEqual({
            "className": "FindByIdUser",
            "entityRepositoryClass": "UserRepository",
            "entityClass": "User",
            "entityClassPropertie": "user",
            "serviceTemplate": "findById",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'}
            ],
            "package": "pe.lacafetalab.pao.communication.user.application.find_by_id",
            "strVoProperties": 'UserId id',
            "strProperties": 'id',
            "serviceClassResponse": 'UserResponse',
            "entityResponseClass": 'UserResponse',
            "listEntityResponseClass": 'ListUserResponse',
            "packageApplication": "pe.lacafetalab.pao.communication.user.application",
        });
    });

    test("queryService template service query", () => {
        expect(templates[1].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id");
        expect(templates[1].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id/FindByIdUserQuery.java");
        expect(templates[1].template).toEqual("main/application/query/query");
        expect(templates[1].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application.find_by_id",
            "className": "FindByIdUserQuery",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'}
            ],
            "strStringProperties": 'String id'
        });
    });

    test("queryService template service queryHandler", () => {
        expect(templates[2].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id");
        expect(templates[2].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/find_by_id/FindByIdUserQueryHandler.java");
        expect(templates[2].template).toEqual("main/application/query/queryHandler");
        expect(templates[2].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application.find_by_id",
            "className": "FindByIdUserQueryHandler",
            "classQueryName": "FindByIdUserQuery",
            "classServiceName": "FindByIdUser",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'}
            ],
            "strProperties": 'id',
            "serviceClassResponse": 'UserResponse',
            "packageApplication": "pe.lacafetalab.pao.communication.user.application",
        });
    });
});