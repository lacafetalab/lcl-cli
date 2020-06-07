import {AbstractGenerate, Template} from "../../../AbstractGenerate";
import {DataManagement} from "../../../config/DataManagement";
import {InterfaceValueObjectPropertie} from "../../../config/ValueObjectPropertie";
import {Config} from "../../../config/Config";

const s = require("underscore.string");

export interface TablePropertie {
    propertie: string,
    isPk: boolean,
    type: string,
    primitive: string,
    columnName: string
}

export class Dao extends AbstractGenerate {
    private config: Config;
    private _properties: string[];

    constructor(_dataManagement: DataManagement, _currentEntity: string, properties: string[] | null = null) {
        super();
        this.config = new Config(_dataManagement, _currentEntity);
        this._properties = properties ?? this.config.properties
    }

    get folder(): string {
        return `${this.config.mainPath}/infrastructure/persistence`;
    }

    get package(): string {
        return `${this.config.package}.infrastructure.persistence`;
    }

    get packageDomain(): string {
        return this.config.packageDomain;
    }

    get template(): Template[] {
        const template: Template[] = [];
        const className = `${this.config.entity}Dao`;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `main/infrastructure/persistence/dao`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            tableName: this.config.repository.table,
            package: this.package,
            entityClass: this.config.entity,
            packageDomain: this.packageDomain,
            strPropertiesToDomain: this.strPropertiesToDomain(voProperties),
            tableProperties: this.tableProperties(this._properties),
            voProperties
        };
        template.push(new Template(this.folder, file, fileTemplate, data));
        return template;
    }

    private strPropertiesToDomain(voProperties: InterfaceValueObjectPropertie[]): string {
        let str = "";
        voProperties.forEach(voPropertie => {
            str = str + `, new ${voPropertie.className}(this.${voPropertie.propertie})`;
        });
        return s.trim(s.trim(str, ','));
    }

    private tableProperties(properties: string[]): TablePropertie[] {
        const tablePropertie: TablePropertie[] = [];
        properties.forEach(propertie => {
            const propertieType = this.config.valueObjectValue(propertie);
            const columnName = (this.config.repository.columnName[propertie]) ? this.config.repository.columnName[propertie] : s.underscored(propertie);
            tablePropertie.push({
                propertie,
                isPk: this.config.repository.pk === propertie,
                type: propertieType.type,
                primitive: propertieType.primitive,
                columnName
            })
        });
        return tablePropertie;
    }
}



