import { CollectionAggregate } from '../../../../modules/load-data/domain/CollectionAggregate';
import { GenerateInterface } from '../generate-Interface';
import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class ServiceCommand implements GenerateInterface {
  async execute(aggregate: string, collectionAggregate: CollectionAggregate): Promise<void> {
    await inquirer.prompt(
      this.questionCreateServiceCommand(aggregate, collectionAggregate.getAggregate(aggregate).propertiesNames),
    );
  }

  private questionCreateServiceCommand(
    aggregate: string,
    properties: string[],
  ): QuestionCollection<{ commandName: string; properties: string[]; templateService: string }> {
    return [
      {
        type: 'input',
        name: 'commandName',
        message: `COMMAND name`,
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
        message: `${aggregate} properties`,
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
