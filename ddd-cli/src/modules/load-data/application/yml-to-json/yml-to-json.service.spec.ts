import { Test, TestingModule } from '@nestjs/testing';
import { YmlToJsonService } from './yml-to-json.service';

describe('YmlToJsonService', () => {
  let service: YmlToJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YmlToJsonService],
    }).compile();

    service = module.get<YmlToJsonService>(YmlToJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
