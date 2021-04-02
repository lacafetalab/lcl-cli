export class MessageText {
  constructor(private _test: string) {}

  get value(): string {
    return this._test;
  }
}
