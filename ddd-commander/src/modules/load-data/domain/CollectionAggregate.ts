import { Aggregate } from './Aggregate';

export class CollectionAggregate {
  constructor(private _collections: Aggregate[]) {}

  get aggregates(): Aggregate[] {
    return this._collections;
  }

  get aggregatesName(): string[] {
    return this._collections.map((item) => {
      return item.name.value;
    });
  }

  getAggregate(aggregateName: string): Aggregate {
    const aggregate = this._collections.find((e) => e.name.value === aggregateName);
    if (!aggregate) {
      throw new Error(`aggregate ${aggregateName} not exist`);
    }
    return aggregate;
  }
}
