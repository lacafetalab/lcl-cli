import "jest";
import {Template} from "../../../src/sdk/AbstractGenerate";
import {dataUser} from "../../config/data/data";
import {CommnadService} from "../../../src/sdk/codeMain/application/CommandService";
import {DataManagement} from "../../../src/sdk/config/DataManagement";


describe("commandService parametos por defecto", () => {
    let commandService: CommnadService;
    beforeEach(() => {
        commandService = new CommnadService(new DataManagement([dataUser()]),"User", "create");
    });
    test("commandService folder", () => {
        expect(commandService.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create");
    });
    test("commandService package", () => {
        expect(commandService.package).toEqual("pe.lacafetalab.pao.communication.user.application.create");
    });
    test("commandService properties", () => {
        expect(commandService.properties).toEqual(['id', 'name', 'lastname', 'description', 'birthdate']);
    });
    test("commandService template", () => {
        expect(commandService.templateService).toEqual("none");
    });
});

describe("commandService parametos propertie id, name", () => {
    let commandService: CommnadService;
    beforeEach(() => {
        commandService = new CommnadService(new DataManagement([dataUser()]),"User", "create", ['id', 'name']);
    });
    test("commandService properties", () => {
        expect(commandService.properties).toEqual(['id', 'name']);
    });
    test("commandService template", () => {
        expect(commandService.templateService).toEqual("none");
    });
});

describe("commandService parametos propertie id, name y templateName", () => {
    let commandService: CommnadService;
    beforeEach(() => {
        commandService = new CommnadService(new DataManagement([dataUser()]),"User", "create", ['id', 'name'], "creator");
    });
    test("commandService properties", () => {
        expect(commandService.properties).toEqual(['id', 'name']);
    });
    test("commandService template", () => {
        expect(commandService.templateService).toEqual("creator");
    });
});

describe("commandService parametos propertie null y  templateName", () => {
    let commandService: CommnadService;
    beforeEach(() => {
        commandService = new CommnadService(new DataManagement([dataUser()]),"User", "create", null, "creator");
    });
    test("commandService properties", () => {
        expect(commandService.properties).toEqual(['id', 'name', 'lastname', 'description', 'birthdate']);
    });
    test("commandService template", () => {
        expect(commandService.templateService).toEqual("creator");
    });
});

describe("commandService parametos por defecto, servicio en mayuscula", () => {
    let commandService: CommnadService;
    beforeEach(() => {
        commandService = new CommnadService(new DataManagement([dataUser()]),"User", "Create");
    });
    test("commandService folder", () => {
        expect(commandService.folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create");
    });
    test("commandService package", () => {
        expect(commandService.package).toEqual("pe.lacafetalab.pao.communication.user.application.create");
    });
});

describe("config value obeject one commandService", () => {
    let templates: Template[] = [];
    beforeEach(() => {
        const commandServiceb = new CommnadService(new DataManagement([dataUser()]),"User", "create", ['id', 'name'], "creator");
        templates = commandServiceb.template;
    });
    test("commandService template id", () => {
        expect(templates.length).toEqual(3);

    });
    test("commandService template service", () => {
        expect(templates[0].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create");
        expect(templates[0].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create/CreateUser.java");
        expect(templates[0].template).toEqual("main/application/command/service");
        expect(templates[0].dataTemplate).toEqual({
            "className": "CreateUser",
            "entityRepositoryClass": "UserRepository",
            "entityClass": "User",
            "entityClassPropertie": "user",
            "serviceTemplate":"creator",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'},
                {"className": 'UserName', "propertie": 'name'}
            ],
            "package": "pe.lacafetalab.pao.communication.user.application.create",
            "strVoProperties": 'UserId id, UserName name',
            "strProperties": 'id, name'
        });
    });

    test("commandService template service command", () => {
        expect(templates[1].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create");
        expect(templates[1].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create/CreateUserCommand.java");
        expect(templates[1].template).toEqual("main/application/command/command");
        expect(templates[1].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application.create",
            "className": "CreateUserCommand",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'},
                {"className": 'UserName', "propertie": 'name'}
            ],
            "strStringProperties": 'String id, String name'
        });
    });

    test("commandService template service commandHandler", () => {
        expect(templates[2].folder).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create");
        expect(templates[2].file).toEqual("src/communication/main/pe/lacafetalab/pao/communication/user/application/create/CreateUserCommandHandler.java");
        expect(templates[2].template).toEqual("main/application/command/commandHandler");
        expect(templates[2].dataTemplate).toEqual({
            "package": "pe.lacafetalab.pao.communication.user.application.create",
            "className": "CreateUserCommandHandler",
            "classCommandName": "CreateUserCommand",
            "classServiceName": "CreateUser",
            "packageDomain": "pe.lacafetalab.pao.communication.user.domain",
            "voProperties": [
                {"className": 'UserId', "propertie": 'id'},
                {"className": 'UserName', "propertie": 'name'}
            ],
            "strProperties": 'id, name'
        });
    });
});