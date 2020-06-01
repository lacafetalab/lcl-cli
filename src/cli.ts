#!/usr/bin/env node

import {CliDdd} from "./cli/CliDdd";
import * as path from "path";


async function main() {
    const pathTemplates = path.join(__dirname, '../', '/templates');
    const relativePath = process.cwd();
    const objectCli = new CliDdd(relativePath, pathTemplates);

    const files = await objectCli.itemsFolderConfig();

    while (objectCli.loop) {
        await objectCli.selectFile(files);
        await objectCli.menu();
    }

}

main();


