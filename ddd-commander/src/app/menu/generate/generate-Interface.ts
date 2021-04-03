import { CollectionAggregate } from '../../../modules/load-data/domain/CollectionAggregate';

export interface GenerateInterface {
  execute(aggregate: string, collectionAggregate: CollectionAggregate, pathTemplate: string): void | Promise<void>;
}
