import { Test, TestingModule } from '@nestjs/testing';
import { ReadYamlService } from './read-yaml.service';
import { DataSkeleton } from '../../domain/DataSkeleton';
import { CollectionData } from '../../domain/CollectionData';

describe.skip('Process Repository', () => {
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

  describe('one_entity', () => {
    it('process default', () => {
      collectionData = processPathData('/one_entity');
      expect(collectionData.getEntity('User').repository.pk.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('id').propertie.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('id').tableName.value).toEqual('id');

      expect(collectionData.getEntity('User').repository.getColumn('lastName').propertie.value).toEqual('lastName');
      expect(collectionData.getEntity('User').repository.getColumn('lastName').tableName.value).toEqual('last_name');
    });

    it('process lastname exist', () => {
      collectionData = processPathData('/one_entity_table_exist');
      expect(collectionData.getEntity('User').repository.pk.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('id').propertie.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('id').tableName.value).toEqual('id');

      expect(collectionData.getEntity('User').repository.getColumn('lastName').propertie.value).toEqual('lastName');
      expect(collectionData.getEntity('User').repository.getColumn('lastName').tableName.value).toEqual('apellido');
    });
  });

  describe('one entity with valueObject', () => {
    it('no table exist', () => {
      collectionData = processPathData('/value_object');
      expect(collectionData.getEntity('User').repository.getColumn('id').tableName.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('name.firstName').tableName.value).toEqual(
        'name_first_name',
      );
      expect(collectionData.getEntity('User').repository.getColumn('name.lastName').tableName.value).toEqual(
        'name_last_name',
      );
    });
    it('table name exist', () => {
      collectionData = processPathData('/value_object_table_exist');
      expect(collectionData.getEntity('User').repository.getColumn('id').tableName.value).toEqual('id');
      expect(collectionData.getEntity('User').repository.getColumn('name.firstName').tableName.value).toEqual(
        'n_first_name',
      );
      expect(collectionData.getEntity('User').repository.getColumn('name.lastName').tableName.value).toEqual(
        'name_last_name',
      );
    });
  });

  describe('two VO get one param', () => {
    it('process id', () => {
      collectionData = processPathData('/two_entities_vo_one_param');
      expect(collectionData.getEntity('User').repository.getColumn('id').tableName.value).toEqual('id');
    });
    it('process name fisrt name', () => {
      collectionData = processPathData('/two_entities_vo_one_param');
      expect(collectionData.getEntity('User').repository.getColumn('name').tableName.value).toEqual('name');
    });
  });
});
