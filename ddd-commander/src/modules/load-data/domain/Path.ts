export class Path {
  constructor(private _path: string) {}
  get value(): string {
    return this._path;
  }
}
