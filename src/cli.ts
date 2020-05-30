#!/usr/bin/env node

import 'module-alias/register';
import {CliDdd} from "./cli/CliDdd";
import * as path from "path";
import {cleantempFolder} from "./Util";


async function main() {
    const pathTemplates = path.join(__dirname, '../', '/templates');
    const relativePath = "./";
    cleantempFolder(relativePath);
    const objectCli = new CliDdd(relativePath, pathTemplates);

    const files = await objectCli.itemsFolderConfig();

    while (objectCli.loop) {
        await objectCli.selectFile(files);
        await objectCli.menu();
    }

}
main();


