import {DataManagement} from "../../sdk/config/DataManagement";

export interface InterfaceBackEndConstructor {
    dataManagement: DataManagement;
    entityCurrent: string;
    relativePath: string;
    pathTemplates: string;
}
