import { Module } from '@nestjs/common';
import { ReadYamlService } from './application/read-yaml/read-yaml.service';
import { LlConsole } from './console/ll.console';
import { YmlToJsonService } from './application/yml-to-json/yml-to-json.service';

const CONSOLE = [LlConsole];

@Module({
  providers: [ReadYamlService, ...CONSOLE, YmlToJsonService],
})
export class LoadDataModule {}
