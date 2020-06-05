import * as inquirer from 'inquirer';
import * as path from "path";
import {generateFile, generateFileAddRempveProperties, logTemplate} from "../Util";
import {
    questionAddOrRemovePropertie,
    questionCreateEventPart1, questionCreateEventPart2,
    questionCreateServiceCommand,
    questionCreateServiceQuery, questionGenerateCorePart1, questionGenerateCorePart2, questionItemsFolderConfig,
    questionMenu, questionSelectFile
} from "./questions";
import {CommnadService} from "../../sdk/codeMain/application/CommandService";
import {QueryService} from "../../sdk/codeMain/application/QueryService";
import {Event, Event as EventDdd} from "../../sdk/codeMain/domain/Event";
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
import {DataManagement} from "../../sdk/config/DataManagement";

const s = require("underscore.string");

export class BackEndCli {
    // @ts-ignore
    private _config: Config;
    private _pathFile: string = "";
    private _entityCurrent: string = "";
    public loop: boolean = true;

    constructor(private _dataManagement: DataManagement, private _relativePath: string, private _pathTemplates: string) {

    }

    private get pathConfig() {
        return path.join(this._relativePath, 'lclcli', 'config');
    }

    private get data() {
        return this._dataManagement.getData(this._entityCurrent)
    }

    private exit() {
        this.loop = false;
    }

    async menu() {
        let listMenu = [
            'Create Service Command',
            'Create Service Query',
            'Create Event',
            'Generate Core',
            'Add or Remove Propertie',
            'Select Entity',
            'Exit'
        ];
        if (this._dataManagement.length === 1) {
            listMenu = listMenu.filter(t => {
                return t !== 'Select Entity'
            });
        }
        const answers = await inquirer.prompt(questionMenu(this._config.entity, listMenu));
        await this.factoryService(answers.menuSelected);
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
            case 'Add or Remove Propertie':
                await this.addOrRemovePropertie();
                break;
            case 'Select Entity':
                this._entityCurrent = "";
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

        const answers = await inquirer.prompt(questionCreateServiceCommand(this._config.properties));
        const command = new CommnadService(this.data, answers.serviceName, answers.properties, answers.templateService);
        this.renderTemplate(command.template);
        this.exit();
    }

    private async createServiceQuery() {

        const answers = await inquirer.prompt(questionCreateServiceQuery(this._config.properties));
        const query = new QueryService(this.data, answers.serviceName, answers.returnType, answers.properties, answers.templateService);
        this.renderTemplate(query.template);
        this.exit();
    }

    private async createEvent() {

        const answersAction = await inquirer.prompt(questionCreateEventPart1());


        const answers = await inquirer.prompt(questionCreateEventPart2(answersAction.eventAction, this._config.eventPrefixEntity, this._config.properties));

        const event = new EventDdd(this.data, answersAction.eventAction, answers.eventName, answers.properties);
        this.renderTemplate(event.template);
        this.exit();
    }

    private async generateCore() {
        const listCores = ['Aggregate', 'ValueObject', 'Repository', 'QueryResponse'];
        let answers = {core: listCores};
        const answersConfirm = await inquirer.prompt(questionGenerateCorePart1());

        if (!answersConfirm.generateAll) {
            answers = await inquirer.prompt(questionGenerateCorePart2(listCores));
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

    private async addOrRemovePropertie() {

        const answers = await inquirer.prompt(questionAddOrRemovePropertie(this._config.properties));
        let originalProperties: string[];
        let newProperties: string[];
        if (answers.type === 'Add') {
            originalProperties = this._config.properties.filter(t => !answers.properties.includes(t));
            newProperties = this._config.properties;
        } else {
            originalProperties = this._config.properties;
            newProperties = this._config.properties.filter(t => !answers.properties.includes(t));
        }

        const aggregateOriginal = new Aggregate(this.data, originalProperties);
        const aggregateNew = new Aggregate(this.data, newProperties);
        generateFileAddRempveProperties(aggregateOriginal.template[0], aggregateNew.template[0], this._relativePath, this._pathTemplates);

        // por defecto se agrega un evento de create al agregate con todas las propiedades
        const eventOriginal = new Event(this.data, 'created', `${this._config.eventPrefixEntity}created`, originalProperties);
        const eventNew = new Event(this.data, 'created', `${this._config.eventPrefixEntity}created`, newProperties);
        generateFileAddRempveProperties(eventOriginal.template[0], eventNew.template[0], this._relativePath, this._pathTemplates);

        const daoOriginal = new Dao(this.data, originalProperties);
        const daoNew = new Dao(this.data, newProperties);
        generateFileAddRempveProperties(daoOriginal.template[0], daoNew.template[0], this._relativePath, this._pathTemplates);

        const entityOriginal = new EntityResponse(this.data, originalProperties);
        const entityNew = new EntityResponse(this.data, newProperties);
        generateFileAddRempveProperties(entityOriginal.template[0], entityNew.template[0], this._relativePath, this._pathTemplates);

        this.exit();
    }

    async selectEntity() {
        if (this._entityCurrent !== "") {
            return;
        }
        if (this._dataManagement.length === 1) {
            this._entityCurrent = this._dataManagement.entities[0];
        } else {
            const answers = await inquirer.prompt(questionSelectFile(this._dataManagement.entities));
            this._entityCurrent = answers.entity;
        }

        this._config = this._dataManagement.getConfig(this._entityCurrent)
    }


}

