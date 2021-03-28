import { Test, TestingModule } from '@nestjs/testing';
import { ReadSkeletonDataService } from './read-skeleton-data.service';

describe('ReadSkeletonDataService', () => {
  let service: ReadSkeletonDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadSkeletonDataService],
    }).compile();

    service = module.get<ReadSkeletonDataService>(ReadSkeletonDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
