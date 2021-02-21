import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { LoadDataModule } from './modules/load-data/load-data.module';
import { CreateModule } from './modules/create/create.module';

@Module({
  imports: [ConsoleModule, LoadDataModule, CreateModule],
})
export class AppModule {}
