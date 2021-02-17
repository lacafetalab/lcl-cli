import { Test, TestingModule } from '@nestjs/testing';
import { ReadYamlService } from './read-yaml.service';
import { count } from 'rxjs/operators';
import { DataSkeleton } from '../../domain/DataSkeleton';

describe('ReadYamlService', () => {
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

  describe('getFiles', () => {
    it('list files', () => {
      const files = service.getFiles(`${relativePath}/get_files`);
      expect(files.length).toEqual(1);
      expect(files).toEqual(['user.yml']);
    });
  });
  describe('readFiles', () => {
    it('read files', () => {
      const path = `${relativePath}/read_files`;
      const files = service.getFiles(path);
      const data = service.readFiles(files, path);
      expect(data.length).toEqual(1);
      expect(data[0]).toBeDefined();
      expect(data[0].path.value).toEqual('src/user-a');
      expect(data[0].nameSpace.value).toEqual('app.userA');
      expect(data[0].name.value).toEqual('UserA');
      expect(data[0].properties[0].name.value).toEqual('aggregate');

      expect(data[0].properties[0].params[0].name.value).toEqual('id');
      expect(data[0].properties[0].params[0].type.value).toEqual('id');

      expect(data[0].properties[0].params[1].name.value).toEqual('name');
      expect(data[0].properties[0].params[1].type.value).toEqual('string');
    });
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

    it('process event', () => {
      expect(processData[0].event.value).toEqual('user');
    });

    it('process repository', () => {
      expect(processData[0].repository.pk.value).toEqual('id');
      expect(processData[0].repository.columns[0].propertie.value).toEqual('id');
      expect(processData[0].repository.columns[0].tableName.value).toEqual('id');

      expect(processData[0].repository.columns[1].propertie.value).toEqual('lastName');
      expect(processData[0].repository.columns[1].tableName.value).toEqual('last_name');
    });
  });
});
