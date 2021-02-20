import { Test, TestingModule } from '@nestjs/testing';
import { ReadYamlService } from './read-yaml.service';
import { DataSkeleton } from '../../domain/DataSkeleton';

describe('Process Propertie', () => {
  let service: ReadYamlService;

  function processPathData(pathFolder):DataSkeleton[]{
    const relativePath = `${service.relativePath()}/templates/config/test/properties/${pathFolder}`;
    const files = service.getFiles(relativePath);
    const data = service.readFiles(files, relativePath);
    return service.process(data);
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadYamlService],
    }).compile();

    service = module.get<ReadYamlService>(ReadYamlService);
  });

  describe('processData one entity', () => {
    let processData: DataSkeleton[];
    beforeEach(() => {
      processData = processPathData('/one_entity');
    });

    it('process default value properties', () => {
      expect(processData[0].properties[0].name.value).toEqual('aggregate');
      expect(processData[0].properties[0].params[0].json).toEqual({
        name: 'id',
        required: false,
        type: 'id',
        defaultValue: null,
      });
      expect(processData[0].properties[0].params[1].json).toEqual({
        name: 'name',
        required: false,
        type: 'string',
        defaultValue: 'JJ',
      });
    });
  });
});
