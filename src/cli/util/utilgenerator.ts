import path from "path";
import {runDiff} from "./utildiff";
import {Template} from "../../sdk/AbstractGenerate";

const fs = require("fs");
const ejs = require("ejs");


export function logTemplate(templates: Template[], show: boolean = false) {
    if (!show) {
        return;
    }
    templates.forEach(template => {
        const data: any = {
            folder: template.folder,
            file: template.file,
            template: template.template,
            dataTemplate: template.dataTemplate,
        };

        console.log(data);
        if (data.dataTemplate.voProperties) {
            console.log("voProperties", data.dataTemplate.voProperties);
        }
        if (data.dataTemplate.tableProperties) {
            console.log("tableProperties", data.dataTemplate.tableProperties);
        }
    });

}

export function generateFile(list: Template[], relativePath: string, pathTemplates: string) {
    list.forEach((param) => {
        const fileGenerate = path.join(relativePath, param.file);
        if (fs.existsSync(fileGenerate)) {
            console.error(`exist : ${path.join(relativePath, param.file)}`);
            // se genera render y copare para hacer un git diff con docker
            generateRenderAndCompare(param, relativePath, pathTemplates);
        } else {
            generateRenderSync(param, relativePath, pathTemplates, "Generated");
        }
    });
}

export function generateRenderSync(param: Template, renderFolder: string, pathTemplates: string, messageCreated: string = "") {

    fs.mkdirSync(path.join(renderFolder, param.folder), {recursive: true});
    const str = generateRender(param, pathTemplates);
    fs.writeFileSync(path.join(renderFolder, param.file), str, 'utf-8');
    if (messageCreated !== "") {
        console.log(`${messageCreated} : ${path.join(renderFolder, param.file)}`);
    }
}

export function generateRender(template: Template, pathTemplates: string): string {
    return ejs.render(fs.readFileSync(path.join(pathTemplates, template.template), 'utf-8'), template.dataTemplate);
}

function generateRenderAndCompare(param: Template, relativePath: string, pathTemplates: string,) {
    const strClass = fs.readFileSync(path.join(relativePath, param.file), 'utf-8');
    const strRender = generateRender(param, pathTemplates)
    runDiff(strClass, strRender);
}

