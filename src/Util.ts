import {Template} from "@sdk/AbstractGenerate";
import path from "path";

const fs = require("fs");
const YAML = require("yaml");
const ejs = require("ejs");

const Git = require("nodegit");
const copydir = require('copy-dir');
const rimraf = require("rimraf");


const tempToolFolder = ".tem";

export function cleantempFolder(relativePath: string) {
    rimraf.sync(path.join(relativePath, tempToolFolder));
}

export async function downloadConfigFolder(relativePath: string) {
    console.log("config folder downloading...");
    cleantempFolder(relativePath);
    await Git.Clone("https://github.com/lacafetalab/lcl-cli.git", path.join(relativePath, tempToolFolder, 'gitrep'));
    copydir.sync(path.join(relativePath, tempToolFolder, 'gitrep', 'templates', 'config', 'lclcli'), path.join(relativePath, 'lclcli'), {
        utimes: true,  // keep add time and modify time
        mode: true,    // keep file mode
        cover: true    // cover file when exists, default is true
    });
    cleantempFolder(relativePath);
    console.log("config folder download");
}

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

export function generateFile(list: Template[], relativePath: string, pathTemplates: string) {
    list.forEach((param) => {
        const fileGenerate = path.join(relativePath, param.file);
        if (fs.existsSync(fileGenerate)) {
            console.error(`exist : ${path.join(relativePath, param.file)}`);
            // se genera render y copare para hacer un git diff con docker
            generateRenderAndCompare(param, relativePath, pathTemplates);
        } else {
            generateRenderSync(param, relativePath, pathTemplates, true);
        }
    });
}

function generateRenderSync(param: Template, renderFolder: string, pathTemplates: string, showLogGenerate: boolean = false) {

    fs.mkdirSync(path.join(renderFolder, param.folder), {recursive: true});
    const str = ejs.render(fs.readFileSync(path.join(pathTemplates, param.template), 'utf-8'), param.dataTemplate);
    fs.writeFileSync(path.join(renderFolder, param.file), str, 'utf-8');
    if (showLogGenerate) {
        console.log(`generated : ${path.join(renderFolder, param.file)}`);
    }
}

function generateRenderAndCompare(param: Template, relativePath: string, pathTemplates: string,) {
    const fileGenerate = path.join(relativePath, param.file);
    // copia el archivo original a la carpeta .tem/diff/compare
    const pathCompare = path.join(relativePath, tempToolFolder, "diff/compare");
    fs.mkdirSync(path.join(pathCompare, param.folder), {recursive: true});
    fs.copyFileSync(fileGenerate, path.join(pathCompare, param.file));

    // genera el archivo renderizado en la carpeta .tem/diff/render
    generateRenderSync(param, path.join(relativePath, tempToolFolder, "diff/render"), pathTemplates);
}

function cppyOriginalFileToCompare(param: Template, compareFolder: string) {
    fs.mkdir(`${compareFolder}${param.folder}`, {recursive: true}, (err: any) => {
        if (err) throw err;
        fs.copyFile(param.file, `${compareFolder}${param.file}`, (errcp: any) => {
            if (errcp) throw errcp;
        });
    });
}


function generateRender(param: Template, renderFolder: string, pathTemplates: string, showLogGenerate: boolean = false) {
    fs.mkdir(path.join(renderFolder, param.folder), {recursive: true}, (errmk: any) => {
        if (errmk) throw errmk;
        ejs.renderFile(path.join(pathTemplates, param.template), param.dataTemplate, {}, function (errtemp: any, str: any) {
            if (errtemp) throw errtemp;
            fs.writeFile(path.join(renderFolder, param.file), str, (err: any) => {
                if (err) throw err;
                if (showLogGenerate) {
                    console.log(`generated : ${path.join(renderFolder, param.file)}`);
                }
            });
        });
    });
}
