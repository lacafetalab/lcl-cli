import { CollectionAggregate } from '../../../modules/load-data/domain/CollectionAggregate';
import { FactoryLanguage } from '../languages/factory-language';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import { LanguageInterface } from '../languages/language-interface';

export class CreateCommandService {
  async execute(
    commandName: string,
    properties: string[],
    templateRender: string,
    aggregateName: string,
    collectionAggregate: CollectionAggregate,
  ) {
    const aggregate = collectionAggregate.getAggregate(aggregateName);
    const service = FactoryLanguage.plugin('node');

    CreateCommandService.renderService(
      aggregate,
      service,
      properties.map((p) => aggregate.getPropertie(p)),
      templateRender,
      commandName,
    );

    CreateCommandService.renderCommand(
      aggregate,
      service,
      properties.map((p) => aggregate.getPropertie(p)),
      commandName,
    );
  }

  private static renderCommand(
    aggregate: Aggregate,
    service: LanguageInterface,
    properties: Propertie[],
    commandName: string,
  ) {
    const classInput = service.className([aggregate.name.value, commandName, 'Input']);
    const className = service.className([aggregate.name.value, commandName, 'Command']);
    const generateFile = service.classFile([aggregate.name.value, commandName, 'Command']);
    const generatefolder = service.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${service.language()}/application/command/command.ejs`,
      templateData: {
        classInput,
        className,
        properties,
      },
      generatefolder,
      generateFile,
    });
  }

  private static renderService(
    aggregate: Aggregate,
    service: LanguageInterface,
    properties: Propertie[],
    templateRender: string,
    commandName: string,
  ) {
    const className = service.className([aggregate.name.value, commandName, 'service']);
    const generateFile = service.classFile([aggregate.name.value, commandName, 'service']);
    const generatefolder = service.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${service.language()}/application/command/service.ejs`,
      templateData: {
        templateRender,
        className,
        aggregate,
        strProperties: properties.map((e) => e.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.name.value}: ${e.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
