import { DataSkeleton } from './DataSkeleton';

export class CollectionData {
  constructor(private data: DataSkeleton[]) {}

  getEntity(entityName: string): DataSkeleton {
    const entity = this.data.find((e) => e.name.value === entityName);
    if (!entity) {
      throw new Error(`entity ${entityName} not exist`);
    }
    return entity;
  }
}
