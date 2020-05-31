import {Template} from "@sdk/AbstractGenerate";
import path from "path";

const fs = require("fs");
const YAML = require("yaml");
const ejs = require("ejs");

const Git = require("nodegit");
const copydir = require('copy-dir');
const rimraf = require("rimraf");

const Diff2html = require('diff2html');
require('colors');
const Diff = require('diff');
const s = require("underscore.string");


const tempToolFolder = ".tem";

export function cleantempFolder(relativePath: string) {
    const pathtemp = path.join(relativePath, tempToolFolder);
    if (fs.existsSync(pathtemp)) {
        rimraf.sync(pathtemp);
    }
}

export async function downloadConfigFolder(relativePath: string) {
    console.log("config folder downloading...");
    cleantempFolder(relativePath);
    fs.mkdirSync(path.join(relativePath, tempToolFolder, 'gitrep'), {recursive: true});
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
    const strClass = fs.readFileSync(path.join(relativePath, param.file), 'utf-8');
    const strRender = ejs.render(fs.readFileSync(path.join(pathTemplates, param.template), 'utf-8'), param.dataTemplate);
    runDiff(strClass, strRender);
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

function runDiff(one: string, other: string) {
    const diff = Diff.createTwoFilesPatch("Original", "Render", one, other);
    const diffJson = Diff2html.parse(diff);
    if (diffJson[0].blocks.length === 0) {
        return;
    }
    let original = "";
    let render = "";
    diffJson[0].blocks.forEach((t: any) => {
        render = render + t.header + "\n\n";
        original = original + t.header + "\n\n";
        t.lines.forEach((l: any) => {
            const content = `${l.content}\n`;
            if (l.type === "insert") {
                const addLineInsert = (s.isBlank(s.ltrim(l.content, '+'))) ? content : s.ltrim(content, '+');
                render = render + addLineInsert;
            } else {
                if (l.type === "delete") {
                    const addLineDelete = (s.isBlank(s.ltrim(l.content, '-'))) ? content : s.ltrim(content, '-');
                    original = original + addLineDelete;
                } else {
                    render = render + content;
                    original = original + content;
                }
            }
        })
    });
    const diffProcess = Diff.diffChars(original, render);
    diffProcess.forEach(function (part: any) {
        const color = part.added ? 'green' :
            part.removed ? 'red' : 'grey';
        process.stderr.write(part.value[color]);
    });
}
