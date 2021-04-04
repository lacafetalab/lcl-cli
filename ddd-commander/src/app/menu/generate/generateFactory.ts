import { GenerateInterface } from './generate-Interface';
import { GenerateType } from './generateType';
import { ServiceCommand } from './services/service-command';
import { CreateCommandService } from '../../render/services/create-command-service';

export class GenerateFactory {
  execute(type: string): GenerateInterface {
    switch (type) {
      case GenerateType.CREATE_SERVICE_COMMAND:
        return new ServiceCommand(new CreateCommandService());
        break;
      default:
        throw new Error(`Type: ${type} is not defined`);
    }
  }
}
