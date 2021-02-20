import { DataSkeleton } from './DataSkeleton';

export class CollectionData {
  constructor(private _collections: DataSkeleton[]) {}


  get collections(): DataSkeleton[] {
    return this._collections;
  }

  getEntity(entityName: string): DataSkeleton {
    const entity = this._collections.find((e) => e.name.value === entityName);
    if (!entity) {
      throw new Error(`entity ${entityName} not exist`);
    }
    return entity;
  }
}
