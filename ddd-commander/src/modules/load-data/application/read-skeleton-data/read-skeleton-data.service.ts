import { AggregateData } from '../../domain/structure';
import { CollectionAggregate } from '../../domain/CollectionAggregate';
import { Aggregate } from '../../domain/Aggregate';

export class ReadSkeletonDataService {
  readData(data: AggregateData[]): CollectionAggregate {
    const aggregates: Aggregate[] = data.map((item) => {
      return Aggregate.create(item);
    });
    return new CollectionAggregate(aggregates);
  }
}
