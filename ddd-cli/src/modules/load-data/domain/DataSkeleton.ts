import {Path} from "./Path";
import {NameSpace} from "./NameSpace";
import {Name} from "./Name";
import {Propertie} from "./propertie/propertie";
import {Event} from "./Event";
import {Message} from "./message/message";
import {Repository} from "./repository/repository";

export class DataSkeleton {

    constructor(
        private _path: Path,
        private _nameSpace: NameSpace,
        private _name: Name,
        private _properties: Propertie[],
        private _message: Message[],
        private _event: Event,
        private _repository: Repository
    ) {
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