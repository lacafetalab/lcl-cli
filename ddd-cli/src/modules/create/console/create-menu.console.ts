import { Console, Command, createSpinner } from 'nestjs-console';
import { ReadYamlService } from '../../load-data/application/read-yaml/read-yaml.service';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { CreateCommandService } from '../application/create-command/create-command.service';
import { InterfaceBackEndConstructor } from '../../../../../src/cli/backend/InterfaceBackEndConstructor';
import { AbstractBackEndGenerator } from '../../../../../src/cli/backend/generator/AbstractBackEndGenerator';
import { ServiceCommandGenerator } from '../../../../../src/cli/backend/generator/ServiceCommandGenerator';
import { ServiceQueryGenerator } from '../../../../../src/cli/backend/generator/ServiceQueryGenerator';
import { EventGenerator } from '../../../../../src/cli/backend/generator/EventGenerator';
import { CoreMenuGenerator } from '../../../../../src/cli/backend/menu/CoreMenuGenerator';
import { AddOrRemoveMenuRefactor } from '../../../../../src/cli/backend/menu/AddOrRemoveMenuRefactor';
import { CollectionData } from '../../load-data/domain/CollectionData';

@Console()
export class CreateMenuConsole {
  constructor(private readonly readYamlService: ReadYamlService, private createCommandService: CreateCommandService) {}

  @Command({
    command: 'create',
    description: 'menu create properties',
  })
  async getHello(): Promise<void> {
    const collection = this.readYamlService.getCollection();
    const entityAnswer = await inquirer.prompt(this.questionSelectEntity(collection.collectionNames));
    const answerCreate = await inquirer.prompt(this.questionMenuCreate(entityAnswer.entity));
    await this.factoryService(answerCreate.menuSelected, entityAnswer.entity, collection);
  }

  private async factoryService(service: string, entityName: string, collection: CollectionData) {
    switch (service) {
      case 'Create Service Command':
        await this.createCommandService.execute(entityName, collection);
        break;
      case 'Create Service Query':
        break;
      case 'Create Event':
        break;
      case 'Generate Core':
        break;
      case 'Add or Remove Propertie':
        break;
    }
  }

  private questionSelectEntity(listEntities: string[]): QuestionCollection<{ entity: string }> {
    return [
      {
        type: 'list',
        name: 'entity',
        message: `Select entity`,
        choices: listEntities,
      },
    ];
  }

  private questionMenuCreate(entity: string): QuestionCollection<{ menuSelected: string }> {
    const listMenu = ['Create Service Command', 'Create Service Query', 'Create Event', 'Generate Core', 'Exit'];
    return [
      {
        type: 'rawlist',
        name: 'menuSelected',
        message: `What do you want to do in ${entity}?`,
        choices: listMenu,
        pageSize: listMenu.length + 2,
      },
    ];
  }
}
