import { AbstractVoString } from './utils/abstract-vo-string';

export class Event extends AbstractVoString {
  constructor(event: string) {
    super(event);
  }

  //setDefaultValue(aggregateName: string) {
  //if (typeof this.value === 'undefined') {
  //this._event = aggregateName.toLowerCase();
  //}
  //}
}
