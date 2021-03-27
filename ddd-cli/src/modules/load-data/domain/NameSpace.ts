export class NameSpace {
  constructor(private _nameSpace: string) {}
  get value(): string {
    return this._nameSpace;
  }
}
