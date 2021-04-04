import { LanguageInterface } from './language-interface';
import { LanguageList } from './language-list';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class JavaLanguage implements LanguageInterface {
  language(): string {
    return LanguageList.JAVA;
  }

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

  folderPath(paths: string[]): string {
    return paths.join('/');
  }
}
