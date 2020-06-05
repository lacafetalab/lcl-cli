const fs = require("fs");
const YAML = require("yaml");


// const Git = require("nodegit");
// const copydir = require('copy-dir');
// const rimraf = require("rimraf");

// const tempToolFolder = ".tem";

// export function cleantempFolder(relativePath: string) {
//     const pathtemp = path.join(relativePath, tempToolFolder);
//     if (fs.existsSync(pathtemp)) {
//         rimraf.sync(pathtemp);
//     }
// }
//
// async function dowloadrepogit(url: string, folder: string) {
//
//     fs.mkdirSync(folder, {recursive: true});
//     await Git.Clone(url, folder);
//     copydir.sync(path.join(folder, tempToolFolder), path.join(folder, 'lclcli'), {
//         utimes: true,  // keep add time and modify time
//         mode: true,    // keep file mode
//         cover: true    // cover file when exists, default is true
//     });
// }


export function readYaml(fileName: string) {
    const file = fs.readFileSync(fileName, "utf8");
    return YAML.parse(file);
}