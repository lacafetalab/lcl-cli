import { Injectable } from '@nestjs/common';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { CollectionData } from '../../../load-data/domain/CollectionData';

const s = require('underscore.string');

@Injectable()
export class CreateCommandService {
  async execute(entityName: string, collection: CollectionData) {
    const answers = await inquirer.prompt(
      this.questionCreateServiceCommand(collection.getEntity(entityName).aggregate.listParamsName()),
    );

    console.log(answers);
  }

  questionCreateServiceCommand(
    properties: string[],
  ): QuestionCollection<{ serviceName: string; properties: string[]; templateService: string }> {
    return [
      {
        type: 'input',
        name: 'serviceName',
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
