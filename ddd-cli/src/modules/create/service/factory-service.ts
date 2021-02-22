import { JavaService } from './java-service';
import { ServiceInterface } from './service-interface';

export class FactoryService {
  static plugin(name: string): ServiceInterface {
    switch (name) {
      case 'java':
        return new JavaService();
      default:
        throw new Error(`FactoryService : ${name} not exist`);
    }
  }
}
