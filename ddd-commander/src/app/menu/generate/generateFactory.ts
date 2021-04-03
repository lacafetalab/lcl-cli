import { GenerateInterface } from './generate-Interface';
import { GenerateType } from './generateType';
import { ServiceCommand } from './service-command';

export class GenerateFactory {
  execute(type: string): GenerateInterface {
    switch (type) {
      case GenerateType.CREATE_SERVICE_COMMAND:
        return new ServiceCommand();
        break;
      default:
        throw new Error(`Type: ${type} is not defined`);
    }
  }
}
