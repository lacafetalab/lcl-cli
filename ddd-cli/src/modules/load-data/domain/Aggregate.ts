import { Path } from './Path';
import { NameSpace } from './NameSpace';
import { Name } from './Name';
import { Propertie } from './propertie/propertie';
import { Event } from './Event';
import { Message } from './message/message';
import { Repository } from './repository/repository';
import { AggregateData } from './structure';
import { CollectionPropertie } from './propertie/collection-propertie';

export class Aggregate {
  constructor(
    private _path: Path,
    private _nameSpace: NameSpace,
    private _name: Name,
    private _aggregateCollectionProperty: CollectionPropertie,
    private _message: Message[],
    private _event: Event,
    private _repository: Repository,
  ) {}

  static create(data: AggregateData): Aggregate {
    const messages = [];
    return new Aggregate(
      new Path(data.path),
      new NameSpace(data.nameSpace),
      new Name(data.name),
      CollectionPropertie.create(data.properties, new Name(data.name)),
      messages,
      new Event(data.event),
      Repository.create(data.repository, new Name(data.name)),
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
    return this._aggregateCollectionProperty.properties;
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
