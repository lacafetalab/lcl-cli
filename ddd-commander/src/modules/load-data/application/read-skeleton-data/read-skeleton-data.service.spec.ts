import { ReadSkeletonDataService } from './read-skeleton-data.service';
import { CollectionAggregate } from '../../domain/CollectionAggregate';

describe('ReadSkeletonDataService', () => {
  let service: ReadSkeletonDataService;

  beforeEach(async () => {
    service = new ReadSkeletonDataService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('collectionAggregate one entity values requerided, Aggregate', () => {
    let collectionAgregate: CollectionAggregate;
    beforeEach(async () => {
      const data = [
        {
          path: 'src/user',
          name: 'User',
          properties: {
            id: 'id',
            name: {
              type: 'string',
            },
            lastName: {
              type: 'string',
              required: false,
              default: '',
            },
          },
        },
      ];
      collectionAgregate = service.readData(data);
    });
    it('Name', () => {
      expect(collectionAgregate.getAggregate('User').name.value).toEqual('User');
    });

    it('Path', () => {
      expect(collectionAgregate.getAggregate('User').path.value).toEqual('src/user');
    });

    it('Propertie Id', () => {
      expect(collectionAgregate.getAggregate('User').getPropertie('id').json).toEqual({
        fullName: 'User:id',
        name: 'id',
        required: true,
        type: 'id',
        defaultValue: null,
      });
    });

    it('Propertie name', () => {
      expect(collectionAgregate.getAggregate('User').getPropertie('name').json).toEqual({
        fullName: 'User:name',
        name: 'name',
        required: true,
        type: 'string',
        defaultValue: null,
      });
    });

    it('Propertie lastname', () => {
      expect(collectionAgregate.getAggregate('User').getPropertie('lastName').json).toEqual({
        fullName: 'User:lastName',
        name: 'lastName',
        required: false,
        type: 'string',
        defaultValue: '',
      });
    });

    it('nameSpace', () => {
      expect(collectionAgregate.getAggregate('User').nameSpace.value).toEqual(null);
    });

    it.todo('message');

    it('event', () => {
      expect(collectionAgregate.getAggregate('User').event.value).toEqual(null);
    });

    it.todo('repository');
  });
});

/*
{
  "path": "src/user",
  "nameSpace": "app.user",
  "name": "User",
  "properties": {
    "id": "id",
    "name": "string",
    "lastName": {
      "type": "string",
      "required": false
    },
    "birthdate": "date",
    "emails": "string[]",
    "address": "User:Address",
    "phones": {
      "type": "User:Phone[]",
      "min": 1
    }
  },
  "entity": [
    {
      "name": "Phone",
      "properties": {
        "id": "id",
        "number": "integer"
      }
    }
  ],
  "valueObject": [
    {
      "name": "Address",
      "properties": {
        "street": "string",
        "number": "integer"
      }
    }
  ],
  "message": {
    "User:name": {
      "required": "El nombre es requerido",
      "valid": "El nombre no es un valor válido"
    },
    "User:phones:number": {
      "required": "El numero del celular es requerido"
    },
    "User:address:street": {
      "required": "El nombre de avenida es requerida"
    },
    "User:phones": {
      "min": " al menos un telefono"
    }
  },
  "event": "user",
  "repository": {
    "pk": "id",
    "table": "user",
    "columnName": {
      "User:id": "id",
      "User:name": "name",
      "User:lastName": "last_name",
      "User:birthdate": "birthdate",
      "User:emails": "emails",
      "User:address:street": "address_street",
      "User:address:number": "address_number",
      "User:phones": "phones"
    }
  }
}
* */
