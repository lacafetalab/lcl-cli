import path from "path";
import * as fs from "fs";
import {generateRenderSync} from "./utilgenerator";
import {isEqualsFiles, runDiff} from "./utildiff";
import {Template} from "../../sdk/AbstractGenerate";
const ejs = require("ejs");

export function generateFileAddRempveProperties(templateOriginal: Template, templateNew: Template, relativePath: string, pathTemplates: string) {

    const fileGenerate = path.join(relativePath, templateOriginal.file);
    if (fs.existsSync(fileGenerate)) {
        const isEquals = isFileEqualsToOriginal(templateOriginal, fileGenerate, pathTemplates);
        // si el archivo existente es igual al parametro que se genero por el cli
        if (isEquals) {
            // se borra el archivo original y se genera un archivo nuevo con los nuevos cmapos
            fs.unlinkSync(fileGenerate);
            generateRenderSync(templateNew, relativePath, pathTemplates, true);
        } else {
            renderTwoTemplatesAndCompare(templateOriginal, templateNew, relativePath, pathTemplates);
        }
    } else {
        generateRenderSync(templateNew, relativePath, pathTemplates, true);
    }
}

function isFileEqualsToOriginal(paramOriginal: Template, pathFileOriginal: string, pathTemplates: string,): boolean {
    const strClass = fs.readFileSync(pathFileOriginal, 'utf-8');
    const strRender = ejs.render(fs.readFileSync(path.join(pathTemplates, paramOriginal.template), 'utf-8'), paramOriginal.dataTemplate);

    return isEqualsFiles(strClass, strRender);
}

function renderTwoTemplatesAndCompare(templateOriginal: Template, templateNew: Template, relativePath: string, pathTemplates: string) {

    const strRenderOriginal = ejs.render(fs.readFileSync(path.join(pathTemplates, templateOriginal.template), 'utf-8'), templateOriginal.dataTemplate);
    const strRenderNew = ejs.render(fs.readFileSync(path.join(pathTemplates, templateNew.template), 'utf-8'), templateNew.dataTemplate);
    runDiff(strRenderOriginal, strRenderNew);

    const fileGenerate = path.join(relativePath, 'lclcli', 'diff', templateNew.file.replace(/^.*[\\\/]/, ''));
    if (fs.existsSync(fileGenerate)) {
        fs.unlinkSync(fileGenerate);
    }
    fs.writeFileSync(fileGenerate, strRenderNew, 'utf-8');
}






