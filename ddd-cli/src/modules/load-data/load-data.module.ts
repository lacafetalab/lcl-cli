import { Module } from '@nestjs/common';
import { ReadYamlService } from './application/read-yaml/read-yaml.service';
import { LlConsole } from './console/ll.console';
import { YmlToJsonService } from './application/yml-to-json/yml-to-json.service';
import { ReadSkeletonDataService } from '../../../../ddd-commander/src/modules/load-data/application/read-skeleton-data/read-skeleton-data.service';

const CONSOLE = [LlConsole];

@Module({
  providers: [ReadYamlService, ...CONSOLE, YmlToJsonService, ReadSkeletonDataService],
})
export class LoadDataModule {}
