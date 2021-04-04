import { storage } from '../in-memory-storage';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require('ejs');

export interface RenderData {
  templateFile: string;
  templateData: any;
  generatefolder: string;
  generateFile: string;
}

export class Render {
  static generate(data: RenderData) {
    const render = Render.generateRender(data.templateFile, data.templateData);
    Render.generateFile(data.generatefolder, data.generateFile, render);
  }

  private static generateRender(templateFile: string, templateData: any): string {
    //console.log(templateData);
    return ejs.render(fs.readFileSync(`${storage.get('pathTemplate')}/main/${templateFile}`, 'utf-8'), templateData);
  }

  private static generateFile(generatefolder: string, generateFile: string, render: string): void {
    const fileGenerate = `${storage.get('pathRender')}/${generatefolder}/${generateFile}`;
    const folderGenerate = `${storage.get('pathRender')}/${generatefolder}`;
    let exist = true;
    if (!fs.existsSync(fileGenerate)) {
      fs.mkdirSync(folderGenerate, { recursive: true });
      fs.writeFileSync(fileGenerate, render, 'utf-8');
      exist = false;
    }
    if (exist) {
      console.log(colors.gray(`[exist] ${fileGenerate}`));
    } else {
      console.log(colors.green(`[created] ${fileGenerate}`));
    }
  }
}
