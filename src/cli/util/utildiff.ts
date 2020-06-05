const Diff2html = require('diff2html');
require('colors');
const Diff = require('diff');


export function isEqualsFiles(one: string, other: string): boolean {
    const diff = Diff.createTwoFilesPatch("Original", "Render", one, other);
    const diffJson = Diff2html.parse(diff);
    return diffJson[0].blocks.length === 0;
}

export function runDiff(one: string, other: string) {
    const diff = Diff.createTwoFilesPatch("Original", "Render", one, other);
    const diffJson = Diff2html.parse(diff);
    if (diffJson[0].blocks.length === 0) {
        return;
    }
    diffJson[0].blocks.forEach((t: any) => {
        t.lines.forEach((l: any) => {
            const content = `${l.content}\n`;
            const color = (l.type === "insert") ? 'green' :
                (l.type === "delete") ? 'red' : 'grey';
            // @ts-ignore
            process.stderr.write(content[color]);
        })
    });
}


// function runDiffbug(one: string, other: string) {
//     const diff = Diff.createTwoFilesPatch("Original", "Render", one, other);
//     const diffJson = Diff2html.parse(diff);
//     if (diffJson[0].blocks.length === 0) {
//         return;
//     }
//     let original = "";
//     let render = "";
//     diffJson[0].blocks.forEach((t: any) => {
//         render = render + t.header + "\n\n";
//         original = original + t.header + "\n\n";
//         t.lines.forEach((l: any) => {
//             const content = `${l.content}\n`;
//             if (l.type === "insert") {
//                 const addLineInsert = (s.isBlank(s.ltrim(l.content, '+'))) ? content : s.ltrim(content, '+');
//                 render = render + addLineInsert;
//             } else {
//                 if (l.type === "delete") {
//                     const addLineDelete = (s.isBlank(s.ltrim(l.content, '-'))) ? content : s.ltrim(content, '-');
//                     original = original + addLineDelete;
//                 } else {
//                     render = render + content;
//                     original = original + content;
//                 }
//             }
//         })
//     });
//     const diffProcess = Diff.diffChars(original, render);
//     diffProcess.forEach(function (part: any) {
//         const color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//         process.stderr.write(part.value[color]);
//     });
// }
