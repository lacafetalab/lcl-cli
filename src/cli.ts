import {itemsFolder} from "./Util";
import * as path from "path";
import {CliDdd} from "./CliDdd";


async function main() {
    const pathFolder = path.join(__dirname, 'config');
    const files = itemsFolder(pathFolder);
    const objectCli = new CliDdd();

    while (objectCli.loop) {
        await objectCli.selectFile(files, pathFolder);
        await objectCli.menu();
    }

}

main();

