import { LanguageInterface } from './language-interface';
import { LanguageList } from './language-list';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-var-requires
const slugify = require('underscore.string/slugify');

export class NodeLanguage implements LanguageInterface {
  language(): string {
    return LanguageList.NODE;
  }

  className(names: string[]): string {
    return names
      .map((n) => {
        return s.capitalize(n);
      })
      .join('');
  }

  classFile(names: string[]): string {
    const namesMayus = names.map((n) => {
      const dd = n.split(/(?=[A-Z])/);
      return dd.join('-');
    });

    const type = slugify(namesMayus.pop());
    const name = namesMayus
      .map((n) => {
        return slugify(n);
      })
      .join('-');
    return `${name}.${type}.ts`;
  }

  folderPath(paths: string[]): string {
    const pathsSeparate = [];
    paths.forEach((value: string) => {
      value.split('/').forEach((v: string) => {
        pathsSeparate.push(v);
      });
    });

    const pathsMayus = pathsSeparate.map((n) => {
      const dd = n.split(/(?=[A-Z])/);
      return dd.join('-');
    });
    return pathsMayus
      .map((n) => {
        return slugify(n);
      })
      .join('/');
  }
}
