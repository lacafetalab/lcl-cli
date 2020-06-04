import * as inquirer from 'inquirer';
import * as path from "path";
import {downloadConfigFolder, generateFile, itemsFolder, logTemplate, readYaml} from "../Util";
import {
    questionCreateEventPart1, questionCreateEventPart2,
    questionCreateServiceCommand,
    questionCreateServiceQuery, questionGenerateCorePart1, questionGenerateCorePart2, questionItemsFolderConfig,
    questionMenu, questionSelectFile
} from "./questions";
import {CommnadService} from "../../sdk/codeMain/application/CommandService";
import {QueryService} from "../../sdk/codeMain/application/QueryService";
import {Event as EventDdd} from "../../sdk/codeMain/domain/Event";
import {Aggregate} from "../../sdk/codeMain/domain/Aggregate";
import {ValueObject} from "../../sdk/codeMain/domain/ValueObject";
import {ValueObjectMother} from "../../sdk/codeTest/domain/ValueObjectMother";
import {Repository} from "../../sdk/codeMain/domain/Repository";
import {JpaRepository} from "../../sdk/codeMain/infrastructure/persistence/JpaRepository";
import {Dao} from "../../sdk/codeMain/infrastructure/persistence/Dao";
import {EntityResponse} from "../../sdk/codeMain/application/EntityResponse";
import {SqlRepository} from "../../sdk/codeMain/infrastructure/persistence/SqlRepository";
import {Config} from "../../sdk/config/Config";
import * as fs from "fs";
import {Template} from "../../sdk/AbstractGenerate";


const s = require("underscore.string");

export class BackEndCli {
    // @ts-ignore
    private _config: Config;
    private _pathFile: string = "";
    public loop: boolean = true;

    constructor(private _relativePath: string, private _pathTemplates: string) {

    }

    private get pathConfig() {
        return path.join(this._relativePath, 'lclcli', 'config');
    }

    private get data() {
        return readYaml(this._pathFile);
    }

    private exit() {
        this.loop = false;
    }

    async menu() {
        const answers = await inquirer.prompt<{ menu: string }>(questionMenu(this._config.entity));
        await this.factoryService(answers.menu);
    }

    private async factoryService(service: string) {
        switch (service) {
            case 'Create Service Command':
                await this.createServiceCommand();
                break;
            case 'Create Service Query':
                await this.createServiceQuery()
                break;
            case 'Create Event':
                await this.createEvent();
                break;
            case 'Generate Core':
                await this.generateCore();
                break;
            case 'Select file':
                this._pathFile = "";
                break;
            case 'Exit':
                this.exit();
                break;
        }
    }

    private renderTemplate(templates: Template[], showConfig: boolean = false) {
        logTemplate(templates, showConfig);
        generateFile(templates, this._relativePath, this._pathTemplates);
    }

    private async createServiceCommand() {

        const answers = await inquirer.prompt<{ serviceName: string, properties: string[], templateService: string }>(questionCreateServiceCommand(this._config.properties));
        const command = new CommnadService(this.data, answers.serviceName, answers.properties, answers.templateService);
        this.renderTemplate(command.template);
        this.exit();
    }

    private async createServiceQuery() {

        const answers = await inquirer.prompt<{ serviceName: string, properties: string[], returnType: string, templateService: string }>(questionCreateServiceQuery(this._config.properties));
        const query = new QueryService(this.data, answers.serviceName, answers.returnType, answers.properties, answers.templateService);
        this.renderTemplate(query.template);
        this.exit();
    }

    private async createEvent() {

        const answersAction = await inquirer.prompt<{ eventAction: string }>(questionCreateEventPart1());


        const answers = await inquirer.prompt<{ eventName: string, properties: string[] }>(questionCreateEventPart2(answersAction.eventAction, this._config.entityClassPropertie, this._config.properties));

        const event = new EventDdd(this.data, answersAction.eventAction, answers.eventName, answers.properties);
        this.renderTemplate(event.template);
        this.exit();
    }

    private async generateCore() {
        const listCores = ['Aggregate', 'ValueObject', 'Repository', 'QueryResponse'];
        let answers = {core: listCores};
        const answersConfirm = await inquirer.prompt<{ generateAll: boolean }>(questionGenerateCorePart1());

        if (!answersConfirm.generateAll) {
            answers = await inquirer.prompt<{ core: string[] }>(questionGenerateCorePart2(listCores));
        }


        if (answers.core.includes('Aggregate')) {
            const aggregate = new Aggregate(this.data);
            this.renderTemplate(aggregate.template);

            // por defecto se agrega un evento de create al agregate con todas las propiedades
            const event = new EventDdd(this.data, 'created', `${this._config.entityClassPropertie}.created`);
            this.renderTemplate(event.template);
        }
        if (answers.core.includes('ValueObject')) {
            const valueObject = new ValueObject(this.data);
            const valueObjectMother = new ValueObjectMother(this.data);
            this.renderTemplate(valueObject.template);

            this.renderTemplate(valueObjectMother.template);
        }


        if (answers.core.includes('Repository')) {
            const repository = new Repository(this.data);
            const dao = new Dao(this.data);
            const jpaRepository = new JpaRepository(this.data);
            const sqlRepository = new SqlRepository(this.data);

            this.renderTemplate(repository.template);
            this.renderTemplate(dao.template);
            this.renderTemplate(jpaRepository.template);
            this.renderTemplate(sqlRepository.template);
        }
        if (answers.core.includes('QueryResponse')) {
            const entityResponse = new EntityResponse(this.data);
            this.renderTemplate(entityResponse.template);
        }

        this.exit();
    }

    async selectFile(listFile: string[]) {
        if (this._pathFile !== "") {
            return;
        }
        if (listFile.length === 0) {
            throw new Error("No existen archivos de configuracion");
        }
        if (listFile.length === 1) {
            this._pathFile = path.join(this.pathConfig, listFile[0]);
        } else {
            const answers = await inquirer.prompt<{ file: string }>(questionSelectFile(listFile));
            this._pathFile = path.join(this.pathConfig, answers.file);
        }

        this._config = new Config(this.data);
    }

    async itemsFolderConfig(): Promise<string[]> {

        if (fs.existsSync(this.pathConfig)) {
            return itemsFolder(this.pathConfig);
        }

        const answers = await inquirer.prompt<{ downloadFolder: boolean }>(questionItemsFolderConfig());
        if (!answers.downloadFolder) {
            this.exit();
            return [];
        }
        await downloadConfigFolder(this._relativePath, this._pathTemplates);
        return itemsFolder(this.pathConfig);
    }

}

