import { PropertieName } from './propertieName';
import { PropertieParam } from './propertieParam';

export class Propertie {
  constructor(private _name: PropertieName, private _params: PropertieParam[]) {}

  static create(properties): Propertie[] {
    return Object.entries(properties).map(([key, value]) => {
      return new Propertie(new PropertieName(key), PropertieParam.create(value));
    });
  }

  get name(): PropertieName {
    return this._name;
  }

  get params(): PropertieParam[] {
    return this._params;
  }

  listParamsName(): string[] {
    return this._params.map((e) => {
      return e.name.value;
    });
  }

  getParam(paramName): PropertieParam {
    const param = this._params.find((e) => e.name.value === paramName);
    if (!param) {
      throw new Error(`param ${paramName} is not defined in ${this.name.value}`);
    }
    return param;
  }
}
