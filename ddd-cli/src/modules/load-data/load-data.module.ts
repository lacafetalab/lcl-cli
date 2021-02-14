import {Module} from '@nestjs/common';
import {ReadYamlService} from "./application/read-yaml/read-yaml.service";
import {LlConsole} from './console/ll.console';

const CONSOLE = [LlConsole]

@Module({
    providers: [ReadYamlService, ...CONSOLE]
})
export class LoadDataModule {
}
