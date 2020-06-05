#!/usr/bin/env node


import * as path from "path";
import {BackEndCli} from "./cli/backend/BackEndCli";
import {BackEndConfigFile} from "./cli/backend/BackEndConfigFile";


async function main() {
    const pathTemplates = path.join(__dirname, '../', '/templates');
    const relativePath = process.cwd();

    const configFile = new BackEndConfigFile(relativePath, pathTemplates);
    const dataManagement = await configFile.getDataManagement();

    if (dataManagement.length === 0) {
        return;
    }

    const objectCli = new BackEndCli(dataManagement,relativePath, pathTemplates);

    while (objectCli.loop) {
        await objectCli.selectEntity();
        await objectCli.menu();
    }

}

main();


