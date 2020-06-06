import inquirer, {QuestionCollection} from "inquirer";

const s = require("underscore.string");


export function questionMenu(entity: string, listMenu: string[]): QuestionCollection<{ menuSelected: string }> {
    return [
        {
            type: 'rawlist',
            name: 'menuSelected',
            message: `What do you want to do in ${entity}?`,
            choices: listMenu,
            pageSize: (listMenu.length + 2)
        }
    ];
}

export function questionCreateServiceCommand(properties: string[]): QuestionCollection<{ serviceName: string, properties: string[], templateService: string }> {

    return [
        {
            type: 'input',
            name: 'serviceName',
            message: `Nombre del servicio de applicacion COMMAND`,
            validate(input: any): boolean | string | Promise<boolean | string> {
                if (s.trim(input).length < 3) {
                    return 'COMMAND name must be at least 3 letters.';
                }
                const regex = /^[a-zA-Z]{2,}$/g;
                if (!regex.test(input)) {
                    return "solo carsteres de a la a-z A-Z"
                }
                return true;
            }
        }, {
            type: 'checkbox',
            name: 'properties',
            message: `Properties`,
            choices: properties,
            default: properties,
        }, {
            type: 'list',
            name: 'templateService',
            message: `alguna plantilla a usar`,
            choices: ['create', 'update', 'delete', 'none'],
            default: "none"
        },
    ];
}

export function questionCreateServiceQuery(properties: string[]): QuestionCollection<{ serviceName: string, properties: string[], returnType: string, templateService: string }> {

    return [
        {
            type: 'input',
            name: 'serviceName',
            message: `Nombre del servicio de applicacion QUERY`,
            validate(input: any): boolean | string | Promise<boolean | string> {
                if (s.trim(input).length < 3) {
                    return 'QUERY name must be at least 3 letters.';
                }
                const regex = /^[a-zA-Z]{2,}$/g;
                if (!regex.test(input)) {
                    return "solo carsteres de a la a-z A-Z"
                }
                return true;
            }
        }, {
            type: 'checkbox',
            name: 'properties',
            message: `Properties`,
            choices: properties,
            default: ['id']
        }, {
            type: 'list',
            name: 'returnType',
            message: `retorna un objeto o una lista?`,
            choices: ['entity', 'list'],
            default: "entity"
        }, {
            type: 'list',
            name: 'templateService',
            message: `alguna plantilla a usar`,
            choices: ['findById', 'searchCriteria', 'none'],
            default: "none"
        },
    ];
}

export function questionCreateEventPart1(): QuestionCollection<{ eventAction: string }> {
    return [
        {
            type: 'input',
            name: 'eventAction',
            message: 'Nombre del evento, ejm: created, updated, deleted',
            validate(input: any): boolean | string | Promise<boolean | string> {
                if (s.trim(input).length < 3) {
                    return 'EVENT name must be at least 3 letters.';
                }
                const regex = /^[a-zA-Z]{2,}$/g;
                if (!regex.test(input)) {
                    return "solo carsteres de a la a-z A-Z"
                }
                return true;
            }
        }
    ];
}

export function questionCreateEventPart2(eventAction: string, eventPrefixEntity: string, properties: string[]): QuestionCollection<{ eventName: string, properties: string[] }> {

    return [
        {
            type: 'input',
            name: 'eventName',
            message: `Nombre para enviar a los demas ms`,
            default: `${eventPrefixEntity}${eventAction}`,
            validate(input: any): boolean | string | Promise<boolean | string> {
                if (s.trim(input).length < 3) {
                    return 'Nombre name must be at least 3 letters.';
                }
                const regex = /^[a-zA-Z]{1,}[a-zA-Z.]{2,}$/g;
                if (!regex.test(input)) {
                    return "solo carsteres de a la a-z A-Z y ."
                }
                return true;
            }
        }, {
            type: 'checkbox',
            name: 'properties',
            message: `Properties`,
            choices: properties.filter(propertie => propertie !== 'id'),
            default: properties.filter(propertie => propertie !== 'id')
        }
    ];
}


export function questionGenerateCore(listCores: string[]): QuestionCollection<{ core: string[] }> {

    return [
        {
            type: 'checkbox',
            name: 'core',
            message: `Selecciona que modelos CORE se va a generar`,
            choices: listCores,
            default: listCores
        }
    ];
}

export function questionSelectFile(listEntities: string[]): QuestionCollection<{ entity: string }> {

    return [
        {
            type: 'list',
            name: 'entity',
            message: `Selecciona el archivo de configuración`,
            choices: listEntities
        },
    ];


}

export function questionItemsFolderConfig(): QuestionCollection<{ downloadFolder: boolean }> {
    return [
        {
            type: 'confirm',
            name: 'downloadFolder',
            message: `No se encontro la carpeta de configuración, desea descargar una plantilla?`,
            default: true
        },
    ];
}


export function questionAddOrRemovePropertie(properties: string[]): QuestionCollection<{ type: string, properties: string[] }> {
    return [
        {
            type: 'list',
            name: 'type',
            message: `agregar o quitar propiedades?`,
            choices: ['Add', 'Remove'],
            validate(input: any): boolean | string | Promise<boolean | string> {
                if ((input === 'Add') || (input === 'Remove')) {
                    return true;
                }
                return "selecione una opción";
            }
        }, {
            type: 'checkbox',
            name: 'properties',
            message: `Selecione las propiedades a modificar`,
            choices: properties,
            validate(input: string[]): boolean | string | Promise<boolean | string> {
                if (input.length === 0) {
                    return "selecione al menos una propiedad";
                }
                return true;
            }
        }
    ];
}


export function questionRenderFile(fileName: string): QuestionCollection<{ menuSelected: string }> {
    return [
        {
            type: 'rawlist',
            name: 'menuSelected',
            message: `No render, what do you want to do? ${fileName}`,
            choices: [
                "Why no render?",
                "Render to clipboard",
                "Show Diff",
                "Render again",
                "Original to clipboard",
                new inquirer.Separator(),
                "Continue"
            ],
            default: "Why no render?"
        }
    ];
}


export function questionRenderGenerateFilePart1(fileName: string): QuestionCollection<{ menuSelected: string }> {
    return [
        {
            type: 'rawlist',
            name: 'menuSelected',
            message: `The file exists, but it is different from the original render, what do you want to do? ${fileName}`,
            choices: [
                "Why is different?",
                "Original render to clipboard",
                "Render again --force",
                new inquirer.Separator(),
                "Continue"
            ],
            default: "Why is different?"
        }
    ];
}


export function questionRenderGenerateFilePart2(fileName: string): QuestionCollection<{ deleteFile: boolean }> {
    return [
        {
            type: 'confirm',
            name: 'deleteFile',
            message: `Are you sure? do you want to replace file : ${fileName}?`,
            default: false
        },
    ];
}
