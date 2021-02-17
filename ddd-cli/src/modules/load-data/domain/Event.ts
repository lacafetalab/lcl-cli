export class Event {
  constructor(private _event: string) {}

  get value(): string {
    return this._event;
  }

  setDefaultValue(aggregateName: string) {
    if (typeof this._event === 'undefined') {
      this._event = aggregateName.toLowerCase();
    }
  }
}
