import * as inquirer from 'inquirer';
import {questionAddOrRemovePropertie} from "../questions";
import {AbstractBackEndGenerator, BackEndGeneratorConstructor} from "../generator/AbstractBackEndGenerator";
import {Event} from "../../../sdk/codeMain/domain/Event";
import {Aggregate} from "../../../sdk/codeMain/domain/Aggregate";
import {Dao} from "../../../sdk/codeMain/infrastructure/persistence/Dao";
import {EntityResponse} from "../../../sdk/codeMain/application/EntityResponse";
import {generateFileAddRempveProperties} from "../../Util";

const s = require("underscore.string");

export class AddOrRemoveMenuRefactor extends AbstractBackEndGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionAddOrRemovePropertie(this.config.properties));
        let originalProperties: string[];
        let newProperties: string[];
        if (answers.type === 'Add') {
            originalProperties = this.config.properties.filter(t => !answers.properties.includes(t));
            newProperties = this.config.properties;
        } else {
            originalProperties = this.config.properties;
            newProperties = this.config.properties.filter(t => !answers.properties.includes(t));
        }

        const aggregateOriginal = new Aggregate(this.data, originalProperties);
        const aggregateNew = new Aggregate(this.data, newProperties);
        generateFileAddRempveProperties(aggregateOriginal.template[0], aggregateNew.template[0], this._relativePath, this._pathTemplates);

        // por defecto se agrega un evento de create al agregate con todas las propiedades
        const eventOriginal = new Event(this.data, 'created', `${this.config.eventPrefixEntity}created`, originalProperties);
        const eventNew = new Event(this.data, 'created', `${this.config.eventPrefixEntity}created`, newProperties);
        generateFileAddRempveProperties(eventOriginal.template[0], eventNew.template[0], this._relativePath, this._pathTemplates);

        const daoOriginal = new Dao(this.data, originalProperties);
        const daoNew = new Dao(this.data, newProperties);
        generateFileAddRempveProperties(daoOriginal.template[0], daoNew.template[0], this._relativePath, this._pathTemplates);

        const entityOriginal = new EntityResponse(this.data, originalProperties);
        const entityNew = new EntityResponse(this.data, newProperties);
        generateFileAddRempveProperties(entityOriginal.template[0], entityNew.template[0], this._relativePath, this._pathTemplates);

    }
}


