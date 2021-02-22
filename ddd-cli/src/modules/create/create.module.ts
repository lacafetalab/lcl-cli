import { Module } from '@nestjs/common';
import { ReadYamlService } from '../load-data/application/read-yaml/read-yaml.service';
import { CreateMenuConsole } from './console/create-menu.console';
import { CreateCommandService } from './application/create-command/create-command.service';
import { CreateCommandConsole } from './console/create-command.console';

const CONSOLE = [CreateMenuConsole, CreateCommandConsole];

@Module({
  providers: [ReadYamlService, ...CONSOLE, CreateCommandService],
})
export class CreateModule {}
