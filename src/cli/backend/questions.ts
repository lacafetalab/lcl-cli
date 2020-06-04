const s = require("underscore.string");


export function questionMenu(entity: string) {
    return [
        {
            type: 'rawlist',
            name: 'menu',
            message: `What do you want to do in ${entity}?`,
            choices: [
                'Create Service Command',
                'Create Service Query',
                'Create Event',
                'Generate Core',
                'Select file',
                'Exit'
            ]
        }
    ];
}

export function questionCreateServiceCommand(properties: string[]) {

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

export function questionCreateServiceQuery(properties: string[]) {

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

export function questionCreateEventPart1() {
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

export function questionCreateEventPart2(eventAction: string, entityClassPropertie: string, properties: string[]) {

    return [
        {
            type: 'input',
            name: 'eventName',
            message: `Nombre para enviar a los demas ms`,
            default: `${entityClassPropertie}.${eventAction}`,
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

export function questionGenerateCorePart1() {
    return [
        {
            type: 'confirm',
            name: 'generateAll',
            message: `Desea generar todo?`,
            default: true
        },
    ];
}

export function questionGenerateCorePart2(listCores: string[]) {

    return [
        {
            type: 'checkbox',
            name: 'core',
            message: `Selecciona que modelos CORE se va a generar`,
            choices: listCores
        }
    ];
}

export function questionSelectFile(listFile: string[]) {

    return [
        {
            type: 'list',
            name: 'file',
            message: `Selecciona el archivo de configuración`,
            choices: listFile
        },
    ];


}

export function questionItemsFolderConfig() {
    return [
        {
            type: 'confirm',
            name: 'downloadFolder',
            message: `Desea descargar el archivo de configuracion?`,
            default: true
        },
    ];
}



