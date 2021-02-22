import { Injectable } from '@nestjs/common';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { CollectionData } from '../../load-data/domain/CollectionData';
import { CreateCommandService } from '../application/create-command/create-command.service';

const s = require('underscore.string');

@Injectable()
export class CreateCommandConsole {
  constructor(private createCommandService: CreateCommandService) {}

  async console(entityName: string, collection: CollectionData) {
    const answers = await inquirer.prompt(
      this.questionCreateServiceCommand(collection.getEntity(entityName).aggregate.listParamsName()),
    );
    await this.createCommandService.execute(
      answers.commandName,
      answers.properties,
      answers.templateService,
      entityName,
      collection,
    );
  }

  questionCreateServiceCommand(
    properties: string[],
  ): QuestionCollection<{ commandName: string; properties: string[]; templateService: string }> {
    return [
      {
        type: 'input',
        name: 'commandName',
        message: `name COMMAND`,
        validate(input: any): boolean | string | Promise<boolean | string> {
          if (s.trim(input).length < 3) {
            return 'COMMAND name must be at least 3 letters.';
          }
          const regex = /^[a-zA-Z]{2,}$/g;
          if (!regex.test(input)) {
            return 'only caracters de a la a-z A-Z';
          }
          return true;
        },
      },
      {
        type: 'checkbox',
        name: 'properties',
        message: `Properties`,
        choices: properties,
        default: properties,
      },
      {
        type: 'list',
        name: 'templateService',
        message: `use template`,
        choices: ['create', 'update', 'delete', 'none'],
        default: 'none',
      },
    ];
  }
}
