import {Module} from '@nestjs/common';
import {ConsoleModule} from 'nestjs-console';
import {LoadDataModule} from './modules/load-data/load-data.module';

@Module({
    imports: [ConsoleModule, LoadDataModule],
})
export class AppModule {
}
