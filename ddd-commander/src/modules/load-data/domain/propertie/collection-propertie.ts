import { Name } from '../Name';
import { Properties } from '../structure';
import { Propertie } from './propertie';

export class CollectionPropertie {
  constructor(private _properties: Propertie[], private _aggegateName: Name) {}

  static create(dataProperties: Properties, aggregateName: Name): CollectionPropertie {
    let properties = Object.entries(dataProperties).map(([key, value]) => {
      return Propertie.create(key, value, aggregateName);
    });

    return new CollectionPropertie(properties, aggregateName);
  }

  get properties(): Propertie[] {
    return this._properties;
  }

  getPropertie(propertieName: string): Propertie {
    const propertie = this._properties.find((e) => e.name.value === `${this._aggegateName.value}:${propertieName}`);
    if (!propertie) {
      throw new Error(`Propertie ${propertieName} in ${this._aggegateName.value} is not defined `);
    }
    return propertie;
  }
}
