import { CollectionAggregate } from '../../../modules/load-data/domain/CollectionAggregate';

export interface GenerateInterface {
  execute(aggregate: string, collectionAggregate: CollectionAggregate): void | Promise<void>;
}
