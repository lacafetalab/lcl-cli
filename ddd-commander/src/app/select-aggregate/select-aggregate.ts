import {CollectionAggregate} from "../../modules/load-data/domain/CollectionAggregate";
import {QuestionCollection} from "inquirer";
import * as inquirer from "inquirer";

export class SelectAggregate {
    constructor( ) {
    }
    async execute(aggregates: CollectionAggregate) {
        const aggregate = await inquirer.prompt(SelectAggregate.questionSelectAgregate(aggregates));
    }
    private static questionSelectAgregate(aggregates: CollectionAggregate): QuestionCollection<{ entity: string }> {
        return [
            {
                type: 'list',
                name: 'entity',
                message: `Select aggregate`,
                choices: aggregates.aggregatesName,
            },
        ];
    }
}