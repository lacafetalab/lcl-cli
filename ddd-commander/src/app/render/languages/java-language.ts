import { LanguageInterface } from './language-interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class JavaLanguage implements LanguageInterface {
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
