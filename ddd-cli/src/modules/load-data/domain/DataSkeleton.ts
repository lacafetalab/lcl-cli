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
    const name = new Name(data.name);
    return new DataSkeleton(
      new Path(data.path),
      new NameSpace(data.nameSpace),
      name,
      [],
      messages,
      new Event(data.event),
      Repository.create(data.repository, name),
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
    return this.getPropertie('aggregate');
  }

  getPropertie(propertieName: string): Propertie {
    const propertie = this._properties.find((e) => e.name.value === propertieName);
    if (!propertie) {
      throw new Error(`Propertie ${this.name.value} not defined `);
    }
    return propertie;
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
