export class Hello {
  constructor(private _hola: string) {}

  get hola(): string {
    return this._hola;
  }
}

console.log('HOla');
