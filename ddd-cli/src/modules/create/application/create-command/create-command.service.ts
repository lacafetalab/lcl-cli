import { Injectable } from '@nestjs/common';
import { CollectionData } from '../../../load-data/domain/CollectionData';
import { FactoryService } from '../../service/factory-service';
import { PropertieParam } from '../../../load-data/domain/propertie/propertieParam';
import { DataSkeleton } from '../../../load-data/domain/DataSkeleton';

const s = require('underscore.string');
const fs = require('fs');
const ejs = require('ejs');

@Injectable()
export class CreateCommandService {
  async execute(
    commandName: string,
    properties: string[],
    templateService: string,
    entityName: string,
    collection: CollectionData,
  ) {
    const entity = collection.getEntity(entityName);
    const language = 'java';
    const service = FactoryService.plugin(language);
    const folderPath = service.folderPath([entity.path.value, 'application'], commandName);
    const servicePropertie = properties.map((p) => {
      return entity.aggregate.getParam(p);
    });

    this.renderService(
      entity,
      language,
      service.className([commandName, entity.name.value, 'service']),
      service.classFile([commandName, entity.name.value, 'service']),
      folderPath,
      servicePropertie,
      templateService,
    );
  }

  private renderService(
    entity: DataSkeleton,
    language: string,
    className: string,
    classFile: string,
    folderPath: string,
    properties: PropertieParam[],
    templateService: string,
  ) {
    const file = `${folderPath}/${classFile}`;
    const fileTemplate = `main/${language}/application/command/service`;

    const render = this.generateRender(fileTemplate, {
      templateService,
      className,
      entity,
      strProperties: properties.map((e) => e.name).join(', '),
      strVoProperties: properties.map((e) => `${e.className} ${e.name.value}`).join(', '),
    });
  }

  generateRender(fileTemplate: string, data: any): string {
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
