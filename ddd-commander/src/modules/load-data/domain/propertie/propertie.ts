import { PropertieName } from './propertieName';
import { PropertieType } from './propertieType';
import { PropertieRequired } from './propertieRequired';
import { PropertieDefault } from './propertieDefault';
import { Name } from '../Name';

interface PropertieValue {
  required: boolean;
  defaultValue: string | boolean | number;
  type: string;
}

export class Propertie {
  constructor(
    private _name: PropertieName,
    private _type: PropertieType,
    private _required: PropertieRequired,
    private _defaultValue: PropertieDefault,
  ) {}

  static create(propertieName: string, value: any, AggregateName: Name): Propertie {
    const { type, required, defaultValue } = this.processValue(value);
    return new Propertie(
      new PropertieName(`${AggregateName.value}:${propertieName}`),
      new PropertieType(type),
      new PropertieRequired(required),
      new PropertieDefault(defaultValue),
    );
  }

  private static processValue(value): PropertieValue {
    let type: string;
    let required: boolean;
    let defaultValue: any;
    if (typeof value === 'string') {
      type = value;
      defaultValue = null;
      required = true;
    } else {
      type = value['type'];
      required = typeof value['required'] == 'undefined' ? true : value['required'];
      defaultValue = typeof value['default'] == 'undefined' ? null : value['default'];
    }
    return {
      type,
      required,
      defaultValue,
    };
  }

  get name(): PropertieName {
    return this._name;
  }

  get type(): PropertieType {
    return this._type;
  }

  get required(): PropertieRequired {
    return this._required;
  }

  get defaultValue(): PropertieDefault {
    return this._defaultValue;
  }

  get json() {
    return {
      name: this.name.value,
      type: this.type.value,
      required: this.required.value,
      defaultValue: this.defaultValue.value,
    };
  }
}
