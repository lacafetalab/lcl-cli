import { CollectionAggregate } from '../../../modules/load-data/domain/CollectionAggregate';
import { FactoryLanguage } from '../languages/factory-language';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../../modules/load-data/domain/propertie/propertie';
import { storage } from '../../in-memory-storage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require('ejs');

export class CreateCommandService {
  async execute(
    commandName: string,
    properties: string[],
    templateService: string,
    aggregateName: string,
    collectionAggregate: CollectionAggregate,
  ) {
    const aggregate = collectionAggregate.getAggregate(aggregateName);
    const language = 'node';
    const service = FactoryLanguage.plugin(language);

    this.renderService(
      aggregate,
      language,
      service.className([aggregate.name.value, commandName, 'service']),
      service.classFile([aggregate.name.value, commandName, 'service']),
      service.folderPath([aggregate.path.value, 'application', commandName]),
      properties.map((p) => aggregate.getPropertie(p)),
      templateService,
    );
  }

  private renderService(
    aggregate: Aggregate,
    language: string,
    className: string,
    classFile: string,
    folderPath: string,
    properties: Propertie[],
    templateService: string,
  ) {
    const fileTemplate = `${language}/application/command/service.ejs`;
    const render = this.generateRender(fileTemplate, {
      templateService,
      className,
      aggregate,
      strProperties: properties.map((e) => e.name.value).join(', '),
      strVoProperties: properties.map((e) => `${e.name.value}: ${e.className}`).join(', '),
    });
    this.generateFile(folderPath, classFile, render);
  }

  generateRender(fileTemplate: string, data: any): string {
    //console.log(data);
    return ejs.render(fs.readFileSync(`${storage.get('pathTemplate')}/main/${fileTemplate}`, 'utf-8'), data);
  }

  generateFile(folderPath: string, classFile: string, render: string): void {
    const fileGenerate = `${storage.get('pathRender')}/${folderPath}/${classFile}`;
    const folderGenerate = `${storage.get('pathRender')}/${folderPath}`;
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
