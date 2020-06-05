#!/usr/bin/env node

import * as path from "path";
import {BackEndMenu} from "./cli/backend/menu/BackEndMenu";
import {BackEndConfigFile} from "./cli/backend/BackEndConfigFile";


async function main() {
    const pathTemplates = path.join(__dirname, '../', '/templates');
    const relativePath = process.cwd();

    const configFile = new BackEndConfigFile(relativePath, pathTemplates);
    const dataManagement = await configFile.getDataManagement();

    if (dataManagement.length === 0) {
        return;
    }

    const backEndMenu = new BackEndMenu(dataManagement, relativePath, pathTemplates);

    while (backEndMenu.continueMenu) {
        await backEndMenu.selectEntity();
        await backEndMenu.menu();
    }

}

main();


