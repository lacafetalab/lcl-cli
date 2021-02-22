import { ServiceInterface } from './service-interface';

const s = require('underscore.string');

export class JavaService implements ServiceInterface {
  className(names: string[]): string {
    return names
      .map((n) => {
        return s.capitalize(n);
      })
      .join('');
  }

  classFile(names: string[]): string {
    const name = names
      .map((n) => {
        return s.capitalize(n);
      })
      .join('');
    return `${name}.java`;
  }

  folderPath(paths: string[], serviceName: string): string {
    const path = paths.join('/');
    return `${path}/${s.decapitalize(serviceName)}`;
  }
}
