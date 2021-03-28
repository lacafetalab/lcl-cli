import { PropertieName } from './propertieName';
import { PropertieParam } from './propertieParam';
import { Name } from '../Name';
import { Properties } from '../structure';
import { Propertie } from './propertie';

export class CollectionPropertie {
  constructor(private _properties: Propertie[], private _name: Name) {}

  static create(dataProperties: Properties, name: Name): CollectionPropertie {
    let properties = Object.entries(dataProperties).map(([key, value]) => {
      return new Propertie(new PropertieName(key), PropertieParam.create(value, name));
    });

    return new CollectionPropertie(properties, name);
  }

  get properties(): Propertie[] {
    return this._properties;
  }

  get name(): Name {
    return this._name;
  }

  getPropertie(propertieName: string): Propertie {
    const propertie = this._properties.find((e) => e.name.value === propertieName);
    if (!propertie) {
      throw new Error(`Propertie ${propertieName} in ${this.name.value} not defined `);
    }
    return propertie;
  }
}
