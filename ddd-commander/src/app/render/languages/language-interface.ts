export interface LanguageInterface {
  className(names: string[]): string;

  classFile(names: string[]): string;

  folderPath(paths: string[], serviceName: string): string;
}
