import { Console, Command, createSpinner } from 'nestjs-console';
import {ReadYamlService} from "../application/read-yaml/read-yaml.service";

@Console()
export class LlConsole {
    constructor(private readonly readYamlService: ReadYamlService) {}

    @Command({
        command: 'll',
        description: 'List all entities',
    })
    async getHello(): Promise<void> {
        console.log("ll list :"+ this.readYamlService.relativePath());
    }
}
