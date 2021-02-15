export class Event {

    constructor(
        private _event: string
    ) {
    }

    get value(): string {
        return this._event;
    }
}