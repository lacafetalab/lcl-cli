import { PropertieParamName } from './propertieParamName';
import { PropertieParamType } from './propertieParamType';
import { PropertieParamRequired } from './propertieParamRequired';
import { PropertieParamDefault } from './propertieParamDefault';

interface PropertieValue {
  required: boolean;
  defaultValue: string | boolean | number;
  type: string;
}

export class PropertieParam {

  constructor(
    private _name: PropertieParamName,
    private _type: PropertieParamType,
    private _required: PropertieParamRequired,
    private _defaultValue: PropertieParamDefault,
  ) {}

  static create(params): PropertieParam[] {
    return Object.entries(params).map(([key, value]) => {
      const { type, required, defaultValue } = this.processValue(value);
      return new PropertieParam(
        new PropertieParamName(key),
        new PropertieParamType(type),
        new PropertieParamRequired(required),
        new PropertieParamDefault(defaultValue),
      );
    });
  }

  static processValue(value): PropertieValue {
    let type: string;
    let required: boolean;
    let defaultValue: any;
    if (typeof value === 'string') {
      type = value;
      defaultValue = this.getDefaultByType(type);
      required = true;
    } else {
      type = value['type'];
      required = value['required'];
      defaultValue = value['default'];
    }

    return {
      type,
      required,
      defaultValue,
    };
  }

  static getDefaultByType(type: string): any {
    switch (type) {
      case 'id':
        return null;
        break;
      case 'string':
        return '';
        break;
      case 'boolean':
        return false;
        break;
      default:
        return null;
        break;
    }
  }


  get name(): PropertieParamName {
    return this._name;
  }

  get type(): PropertieParamType {
    return this._type;
  }

  get required(): PropertieParamRequired {
    return this._required;
  }

  get defaultValue(): PropertieParamDefault {
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
