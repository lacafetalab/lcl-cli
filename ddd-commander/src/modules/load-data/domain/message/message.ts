import { MessagePropertie } from './messagePropertie';
import { MessageType } from './messageType';
import { MessageText } from './messageText';

export class Message {
  constructor(private _propertie: MessagePropertie, private _text: MessageText, private _type: MessageType) {}

  get propertie(): MessagePropertie {
    return this._propertie;
  }

  get text(): MessageText {
    return this._text;
  }

  get type(): MessageType {
    return this._type;
  }
}
