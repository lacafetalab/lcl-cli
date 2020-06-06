import path from "path";
import * as fs from "fs";
import {Template} from "../../sdk/AbstractGenerate";

const ejs = require("ejs");

// export function generateFileAddRempveProperties(templateOriginal: Template, templateNew: Template, relativePath: string, pathTemplates: string) {
//
//     const fileGenerate = path.join(relativePath, templateOriginal.file);
//     if (fs.existsSync(fileGenerate)) {
//         const strClass = fs.readFileSync(fileGenerate, 'utf-8');
//         const strRenderOriginal = ejs.render(fs.readFileSync(path.join(pathTemplates, templateOriginal.template), 'utf-8'), templateOriginal.dataTemplate);
//
//         // si el archivo existente es igual al render original, se puede actizar el archivo
//         if (isEqualsFiles(strClass, strRenderOriginal)) {
//             // se borra el archivo original y se genera un archivo nuevo con los nuevos campos
//             fs.unlinkSync(fileGenerate);
//             generateRenderSync(templateNew, relativePath, pathTemplates, "Updated");
//         } else {
//             renderTwoTemplatesAndCompare(templateOriginal, templateNew, relativePath, pathTemplates);
//         }
//     } else {
//         generateRenderSync(templateNew, relativePath, pathTemplates, "Generated");
//     }
// }


// export function renderTwoTemplatesAndCompare(templateOriginal: Template, templateNew: Template, relativePath: string, pathTemplates: string) {
//
//     const strRenderOriginal = ejs.render(fs.readFileSync(path.join(pathTemplates, templateOriginal.template), 'utf-8'), templateOriginal.dataTemplate);
//     const strRenderNew = ejs.render(fs.readFileSync(path.join(pathTemplates, templateNew.template), 'utf-8'), templateNew.dataTemplate);
//     runDiff(strRenderOriginal, strRenderNew);
//
//     const fileGenerate = path.join(relativePath, 'lclcli', 'diff', templateNew.file.replace(/^.*[\\\/]/, ''));
//     if (fs.existsSync(fileGenerate)) {
//         fs.unlinkSync(fileGenerate);
//     }
//     fs.writeFileSync(fileGenerate, strRenderNew, 'utf-8');
// }


