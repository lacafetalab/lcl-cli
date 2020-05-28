import {Template} from "@sdk/AbstractGenerate";

const fs = require("fs");
const YAML = require("yaml");
const ejs = require("ejs");


export function itemsFolder(folder: string): string[] {
    const listFile: string[] = [];
    // tslint:disable-next-line:only-arrow-functions
    fs.readdirSync(folder).forEach(function (file: string) {
        listFile.push(file);
    });
    return listFile;
}

export function readYaml(fileName: string) {
    const file = fs.readFileSync(fileName, "utf8");
    return YAML.parse(file);
}

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


export function generateFile(list: Template[]) {
    list.forEach((param) => {
        if (fs.existsSync(param.file)) {
            console.error(`exist : ${param.file}`);
            // se copia el archjvo original y se genera un render para luego sacar la comparacion con GIT
            // copia el archivo original a /compare/....
            cppyOriginalFileToCompare(param, "/compare")
            // genera el archivo renderizado en la carpeta /render/....
            generateRender(param, "/render");
        } else {
            generateRender(param);
        }
    });
}

function generateRender(param: Template, renderFolder: string = "") {
    fs.mkdir(`${renderFolder}${param.folder}`, {recursive: true}, (errmk: any) => {
        if (errmk) throw errmk;
        ejs.renderFile(param.template, param.dataTemplate, {}, function (errtemp: any, str: any) {
            if (errtemp) throw errtemp;
            fs.writeFile(`${renderFolder}${param.file}`, str, (err: any) => {
                if (err) throw err;
                if (renderFolder === "") {
                    console.log(`generated : ${renderFolder}${param.file}`);
                }
            });
        });
    });
}

function cppyOriginalFileToCompare(param: Template, compareFolder: string) {
    fs.mkdir(`${compareFolder}${param.folder}`, {recursive: true}, (err: any) => {
        if (err) throw err;
        fs.copyFile(param.file, `${compareFolder}${param.file}`, (errcp: any) => {
            if (errcp) throw errcp;
        });
    });
}
