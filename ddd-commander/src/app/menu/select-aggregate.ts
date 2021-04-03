import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';

export class SelectAggregate {
  async execute(aggregates: CollectionAggregate): Promise<string> {
    const aggregateAnswer = await inquirer.prompt(SelectAggregate.questionSelectAgregate(aggregates));
    return aggregateAnswer.aggregate;
  }

  private static questionSelectAgregate(aggregates: CollectionAggregate): QuestionCollection<{ aggregate: string }> {
    return [
      {
        type: 'list',
        name: 'aggregate',
        message: `Select aggregate`,
        choices: aggregates.aggregatesName,
      },
    ];
  }
}
