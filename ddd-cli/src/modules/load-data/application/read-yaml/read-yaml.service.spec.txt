import { Test, TestingModule } from '@nestjs/testing';
import { ReadYamlService } from './read-yaml.service';
import { DataSkeleton } from '../../domain/DataSkeleton';

describe.skip('ReadYamlService', () => {
  let service: ReadYamlService;
  let relativePath: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadYamlService],
    }).compile();

    service = module.get<ReadYamlService>(ReadYamlService);
    relativePath = `${service.relativePath()}/templates/config/test`;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processData', () => {
    let processData: DataSkeleton[];
    beforeEach(() => {
      const path = `${relativePath}/process_data`;
      const files = service.getFiles(path);
      const data = service.readFiles(files, path);
      processData = service.process(data);
    });

    it('no change properties basic', () => {
      expect(processData.length).toEqual(1);
      expect(processData[0]).toBeDefined();
      expect(processData[0].path.value).toEqual('src/user');
      expect(processData[0].nameSpace.value).toEqual('app.user');
      expect(processData[0].name.value).toEqual('User');
      expect(processData[0].properties[0].name.value).toEqual('aggregate');

      expect(processData[0].properties[0].params[0].name.value).toEqual('id');
      expect(processData[0].properties[0].params[0].type.value).toEqual('id');

      expect(processData[0].properties[0].params[1].name.value).toEqual('lastName');
      expect(processData[0].properties[0].params[1].type.value).toEqual('string');
    });

    it('process properties', () => {
      expect(processData[0].properties[0].name.value).toEqual('aggregate');
      expect(processData[0].properties[0].params[0].json).toEqual({
        name: 'id',
        required: true,
        type: 'id',
        defaultValue: null,
      });
      expect(processData[0].properties[0].params[1].json).toEqual({
        name: 'lastName',
        required: true,
        type: 'string',
        defaultValue: '',
      });
    });

    it('process event', () => {
      expect(processData[0].event.value).toEqual('user');
    });
  });
});
