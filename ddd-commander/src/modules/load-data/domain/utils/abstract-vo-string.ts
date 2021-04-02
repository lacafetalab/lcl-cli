export abstract class AbstractVoString {
  private readonly _value: string | null;

  protected constructor(value: any, valuDefault: string | null = null) {
    this._value = typeof value == 'undefined' ? valuDefault : value;
  }

  get value(): string {
    return this._value;
  }
}
