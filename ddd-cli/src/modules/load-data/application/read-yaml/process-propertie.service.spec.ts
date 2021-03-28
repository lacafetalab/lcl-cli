import { Test, TestingModule } from '@nestjs/testing';
import { ReadYamlService } from './read-yaml.service';
import { DataSkeleton } from '../../domain/DataSkeleton';
import { CollectionData } from '../../domain/CollectionData';

describe.skip('Process Propertie', () => {
  let service: ReadYamlService;
  let collectionData: CollectionData;

  function processPathData(pathFolder): CollectionData {
    const relativePath = `${service.relativePath()}/templates/config/test/properties/${pathFolder}`;
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

  describe('collectionData one entity', () => {
    it('process default value properties', () => {
      collectionData = processPathData('/one_entity');
      expect(collectionData.getEntity('User').aggregate.name.value).toEqual('aggregate');
      expect(collectionData.getEntity('User').aggregate.getParam('id').json).toEqual({
        name: 'id',
        required: false,
        type: 'id',
        defaultValue: null,
      });
      expect(collectionData.getEntity('User').aggregate.getParam('name').json).toEqual({
        name: 'name',
        required: false,
        type: 'string',
        defaultValue: 'JJ',
      });
    });
  });

  describe('collectionData two entitys', () => {
    it('process value properties', () => {
      collectionData = processPathData('/two_entity');
      expect(collectionData.getEntity('User').aggregate.getParam('id').json).toEqual({
        name: 'id',
        required: false,
        type: 'id',
        defaultValue: null,
      });
      expect(collectionData.getEntity('User').aggregate.getParam('name').json).toEqual({
        name: 'name',
        required: false,
        type: 'string',
        defaultValue: 'JJ',
      });
      expect(collectionData.getEntity('UserB').aggregate.name.value).toEqual('aggregate');
      expect(collectionData.getEntity('UserB').aggregate.getParam('id').json).toEqual({
        name: 'id',
        required: false,
        type: 'id',
        defaultValue: null,
      });
      expect(collectionData.getEntity('UserB').aggregate.getParam('name').json).toEqual({
        name: 'name',
        required: false,
        type: 'string',
        defaultValue: 'BB',
      });
    });
  });

  describe('collectionData one entity valueObject', () => {
    it('process value properties', () => {
      collectionData = processPathData('/value_object');
      expect(collectionData.getEntity('User').aggregate.getParam('id').json).toEqual({
        name: 'id',
        required: true,
        type: 'id',
        defaultValue: null,
      });
      expect(collectionData.getEntity('User').aggregate.getParam('id').type.isValueObject).toEqual(false);
      expect(collectionData.getEntity('User').aggregate.getParam('name').json).toEqual({
        name: 'name',
        required: true,
        type: 'User:name',
        defaultValue: null,
      });

      expect(collectionData.getEntity('User').aggregate.getParam('name').type.isValueObject).toEqual(true);

      expect(collectionData.getEntity('User').getPropertie('name').getParam('firstName').json).toEqual({
        name: 'firstName',
        required: true,
        type: 'string',
        defaultValue: '',
      });
      expect(collectionData.getEntity('User').getPropertie('name').getParam('lastName').json).toEqual({
        name: 'lastName',
        required: true,
        type: 'string',
        defaultValue: '',
      });
    });
  });
});
