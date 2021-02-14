import { Test, TestingModule } from '@nestjs/testing';
import { ReadYamlService } from './read-yaml.service';

describe('ReadYamlService', () => {
  let service: ReadYamlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadYamlService],
    }).compile();

    service = module.get<ReadYamlService>(ReadYamlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
