import * as inquirer from 'inquirer';
import * as path from "path";
import {questionItemsFolderConfig} from "./questions";
import * as fs from "fs";
import {DataManagement} from "../../sdk/config/DataManagement";
import {readYaml} from "../util";

const copydir = require('copy-dir');

const s = require("underscore.string");

export class BackEndConfigFile {

    constructor(private _relativePath: string, private _pathTemplates: string) {

    }

    private getData(file: string) {
        return readYaml(path.join(this.pathConfig, file));
    }

    private get pathConfig() {
        return path.join(this._relativePath, 'lclcli', 'config');
    }

    async getDataManagement(): Promise<DataManagement> {

        if (fs.existsSync(this.pathConfig)) {
            return this.itemsFolder();
        }
        const answers = await inquirer.prompt(questionItemsFolderConfig());
        if (answers.downloadFolder) {
            await this.downloadConfigFolder();
            return this.itemsFolder();

        }
        return new DataManagement([]);
    }

    private downloadConfigFolder() {
        copydir.sync(path.join(this._pathTemplates, 'config', 'lclcli'), path.join(this._relativePath, 'lclcli'), {
            utimes: true,  // keep add time and modify time
            mode: true,    // keep file mode
            cover: true    // cover file when exists, default is true
        });
    }

    private itemsFolder(): DataManagement {
        const listFile: string[] = [];
        // tslint:disable-next-line:only-arrow-functions
        fs.readdirSync(this.pathConfig).forEach(function (file: string) {
            listFile.push(file);
        });
        const listData = listFile.map(file => this.getData(file));

        return new DataManagement(listData);
    }


}

