import { Aggregate } from './Aggregate';
import { DataSkeleton } from './DataSkeleton';

export class CollectionAggregate {
  constructor(private _collections: Aggregate[]) {}

  get collections(): Aggregate[] {
    return this._collections;
  }

  get collectionNames(): string[] {
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
