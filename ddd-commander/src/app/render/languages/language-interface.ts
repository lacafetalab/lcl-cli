export interface LanguageInterface {
  language(): string;

  className(names: string[]): string;

  classFile(names: string[]): string;

  folderPath(paths: string[]): string;
}
