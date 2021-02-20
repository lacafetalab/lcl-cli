import { Test, TestingModule } from '@nestjs/testing';
import { ReadYamlService } from './read-yaml.service';
import { DataSkeleton } from '../../domain/DataSkeleton';
import { CollectionData } from '../../domain/CollectionData';

describe('Process Repository', () => {
  let service: ReadYamlService;
  let collectionData: CollectionData;

  function processPathData(pathFolder): CollectionData {
    const relativePath = `${service.relativePath()}/templates/config/test/repository/${pathFolder}`;
    const files = service.getFiles(relativePath);
    const data = service.readFiles(files, relativePath);
    const process = service.process(data);
    return service.processCollection(process);
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadYamlService],
    }).compile();
    service = module.get<ReadYamlService>(ReadYamlService);
  });

  describe('generate defalt repository', () => {
    it('process one entity repository', () => {
      collectionData = processPathData('/one_entity');
      expect(collectionData.getEntity('User').repository.pk.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('id').propertie.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('id').tableName.value).toEqual('id');

      expect(collectionData.getEntity('User').repository.getColumn('lastName').propertie.value).toEqual('lastName');
      expect(collectionData.getEntity('User').repository.getColumn('lastName').tableName.value).toEqual('last_name');
    });
  });


  describe('generate complement collectionData one entity valueObject', () => {
    it('process id', () => {
      collectionData = processPathData('/value_object');
      expect(collectionData.getEntity('User').repository.getColumn('id').tableName.value).toEqual('id');
    });
    it('process name fisrt name', () => {
      collectionData = processPathData('/value_object');
      expect(collectionData.getEntity('User').repository.getColumn('name.firstName').tableName.value).toEqual(
          'name_first_name'
      );
    });
    it('process name last name', () => {
      collectionData = processPathData('/value_object');
      expect(collectionData.getEntity('User').repository.getColumn('name.lastName').tableName.value).toEqual(
          'name_last_name'
      );
    });
  });


});
