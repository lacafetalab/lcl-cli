import { Propertie } from '../modules/load-data/domain/propertie/propertie';
import { CollectionAggregate } from '../modules/load-data/domain/CollectionAggregate';

interface StorageProperties {
  [index: string]: Propertie;
}

interface StorageInterface {
  [index: string]: any;
}

class InMemoryStorage {
  private static instance: InMemoryStorage;

  private constructor(private _storage: StorageInterface = {}, private _properties: StorageProperties = {}) {}

  public static getInstance(): InMemoryStorage {
    if (!InMemoryStorage.instance) {
      InMemoryStorage.instance = new InMemoryStorage();
    }
    return InMemoryStorage.instance;
  }

  get(key: string): any {
    return this._storage[key];
  }

  set(key: string, value: any) {
    this._storage[key] = value;
  }

  getPropertie(fullName: string): Propertie {
    return this._properties[fullName];
  }

  setPropertie(fullName: string, propertie: Propertie) {
    this._properties[fullName] = propertie;
  }

  setallPropertie(collectionAggregate: CollectionAggregate) {
    collectionAggregate.aggregates.forEach((aggregate) => {
      aggregate.properties.forEach((propertie) => {
        this.setPropertie(propertie.name.fullName, propertie);
      });
    });
  }
}

export const storage = InMemoryStorage.getInstance();
