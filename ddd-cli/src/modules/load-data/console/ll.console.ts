import { Console, Command, createSpinner } from 'nestjs-console';
import { ReadYamlService } from '../application/read-yaml/read-yaml.service';

@Console()
export class LlConsole {
  constructor(private readonly readYamlService: ReadYamlService) {}

  @Command({
    command: 'ls',
    description: 'List all entities',
  })
  async getHello(): Promise<void> {
    /*const collection = this.readYamlService.getCollection();
    console.log(collection.collectionNames);*/
  }
}
