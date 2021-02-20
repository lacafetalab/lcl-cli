import { Path } from './Path';
import { NameSpace } from './NameSpace';
import { Name } from './Name';
import { Propertie } from './propertie/propertie';
import { Event } from './Event';
import { Message } from './message/message';
import { Repository } from './repository/repository';

export class DataSkeleton {
  constructor(
    private _path: Path,
    private _nameSpace: NameSpace,
    private _name: Name,
    private _properties: Propertie[],
    private _message: Message[],
    private _event: Event,
    private _repository: Repository,
  ) {}

  static create(data) {
    const messages = [];
    return new DataSkeleton(
      new Path(data.path),
      new NameSpace(data.nameSpace),
      new Name(data.name),
      Propertie.create(data.properties),
      messages,
      new Event(data.event),
      Repository.create(data.repository),
    );
  }

  get path(): Path {
    return this._path;
  }

  get nameSpace(): NameSpace {
    return this._nameSpace;
  }

  get name(): Name {
    return this._name;
  }

  get properties(): Propertie[] {
    return this._properties;
  }

  get aggregate(): Propertie {
    const aggregate = this._properties.find((e) => e.name.value === 'aggregate');
    if (!aggregate) {
      throw new Error(`aggregate no defined ${this.name.value}`);
    }
    return aggregate;
  }

  get message(): Message[] {
    return this._message;
  }

  get event(): Event {
    return this._event;
  }

  get repository(): Repository {
    return this._repository;
  }
}
