import {Path} from "./Path";
import {NameSpace} from "./NameSpace";
import {Name} from "./Name";
import {Propertie} from "./propertie/propertie";
import {Event} from "./Event";

export class DataSkeleton{

    constructor(
        private path:Path,
        private nameSpace:NameSpace,
        private name:Name,
        private properties:Propertie[],
        private message:string,
        private event:Event,
        private repository:string
    ) {
    }
}