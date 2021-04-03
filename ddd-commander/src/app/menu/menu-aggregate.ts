import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';

export class MenuAggregate {
  async execute(aggregate: string): Promise<string> {
    const answerMenuCreate = await inquirer.prompt(MenuAggregate.questionMenuCreate(aggregate));
    return answerMenuCreate.menuSelected;
  }

  private static questionMenuCreate(aggregate: string): QuestionCollection<{ menuSelected: string }> {
    const listMenu = MenuAggregate.menu();
    return [
      {
        type: 'rawlist',
        name: 'menuSelected',
        message: `What do you want to generate in ${aggregate}?`,
        choices: listMenu,
        //pageSize: listMenu.length + 2,
      },
    ];
  }

  private static menu() {
    return ['Create Service Command', 'Create Service Query', 'Create Event', 'Generate Core'];
  }
}
