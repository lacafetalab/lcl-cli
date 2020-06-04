#!/usr/bin/env node


import * as path from "path";
import {BackEndCli} from "./cli/backend/BackEndCli";


async function main() {
    const pathTemplates = path.join(__dirname, '../', '/templates');
    const relativePath = process.cwd();
    const objectCli = new BackEndCli(relativePath, pathTemplates);

    const files = await objectCli.itemsFolderConfig();

    while (objectCli.loop) {
        await objectCli.selectFile(files);
        await objectCli.menu();
    }

}

main();


