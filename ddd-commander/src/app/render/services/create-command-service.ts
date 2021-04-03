import { CollectionAggregate } from '../../../modules/load-data/domain/CollectionAggregate';
import { FactoryLanguage } from '../languages/factory-language';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../../modules/load-data/domain/propertie/propertie';

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
    pathTemplate: string,
  ) {
    const aggregate = collectionAggregate.getAggregate(aggregateName);
    const language = 'node';
    const service = FactoryLanguage.plugin(language);

    this.renderService(
      aggregate,
      language,
      service.className([commandName, aggregate.name.value, 'service']),
      service.classFile([commandName, aggregate.name.value, 'service']),
      service.folderPath([aggregate.path.value, 'application'], commandName),
      properties.map((p) => aggregate.getPropertie(p)),
      templateService,
      pathTemplate,
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
    pathTemplate: string,
  ) {
    // const file = `${folderPath}/${classFile}`;
    const fileTemplate = `${pathTemplate}/main/${language}/application/command/service`;

    this.generateRender(fileTemplate, {
      templateService,
      className,
      aggregate,
      strProperties: properties.map((e) => e.name.value).join(', '),
      strVoProperties: properties.map((e) => `${e.className} ${e.name.value}`).join(', '),
    });

    //console.log(render);
  }

  generateRender(fileTemplate: string, data: any): string {
    console.log(data);
    return ejs.render(fs.readFileSync(fileTemplate, 'utf-8'), data);
  }

  /*
    private renderService(className:string): Template {
      const className = this.service.className();
      const file = `${this.folder}/${className}.java`;
      const fileTemplate = `main/application/command/service`;
      const voProperties = this.config.valueObjectProperties(this._properties);
      const data = {
        className,
        entityRepositoryClass: `${this.config.entity}Repository`,
        entityClass: this.config.entityClass,
        entityClassPropertie: this.config.entityClassPropertie,
        packageDomain: this.config.packageDomain,
        serviceTemplate: this.templateService,
        package: this.package,
        strProperties: this.strProperties(this._properties),
        strVoProperties: this.strVoProperties(voProperties),
        voProperties,
      };
      return new Template(this.folder, file, fileTemplate, data);
    }
  
    generateRenderSync(param: Template, renderFolder: string, pathTemplates: string, messageCreated: string = '') {
      fs.mkdirSync(path.join(renderFolder, param.folder), { recursive: true });
      const str = this.generateRender(param, pathTemplates);
      fs.writeFileSync(path.join(renderFolder, param.file), str, 'utf-8');
      if (messageCreated !== '') {
        console.log(`${messageCreated} : ${path.join(renderFolder, param.file)}`);
      }
    }
  
    generateRender(template: Template, pathTemplates: string): string {
      return ejs.render(fs.readFileSync(path.join(pathTemplates, template.template), 'utf-8'), template.dataTemplate);
    }
  */
}
