import { LanguageList } from './language-list';
import { LanguageInterface } from './language-interface';
import { NodeLanguage } from './node-language';

export class FactoryLanguage {
  static plugin(name: string): LanguageInterface {
    switch (name) {
      case LanguageList.NODE:
        return new NodeLanguage();
      default:
        throw new Error(`FactoryService : ${name} not exist`);
    }
  }
}
