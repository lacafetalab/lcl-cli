import { NodeLanguage } from './node-language';

describe('NodeLanguage', () => {
  let service: NodeLanguage;

  beforeEach(async () => {
    service = new NodeLanguage();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('className', () => {
    it('Camel case', () => {
      const className = service.className(['Create', 'User', 'service']);
      expect(className).toEqual('CreateUserService');
    });
    it('minuscula case', () => {
      const className = service.className(['create', 'user', 'service']);
      expect(className).toEqual('CreateUserService');
    });
    it('DoubleName case', () => {
      const className = service.className(['findById', 'user', 'service']);
      expect(className).toEqual('FindByIdUserService');
    });
  });

  describe('classFile', () => {
    it('Camel case', () => {
      const className = service.classFile(['Create', 'User', 'service']);
      expect(className).toEqual('create-user.service.ts');
    });
    it('minuscula case', () => {
      const className = service.classFile(['create', 'user', 'service']);
      expect(className).toEqual('create-user.service.ts');
    });
    it('DoubleName case', () => {
      const className = service.classFile(['findById', 'user', 'service']);
      expect(className).toEqual('find-by-id-user.service.ts');
    });
    it('guion separate  case', () => {
      const className = service.classFile(['find-by-id', 'user', 'service']);
      expect(className).toEqual('find-by-id-user.service.ts');
    });
    it('guion separate  case', () => {
      const className = service.classFile(['find-By-Id', 'user', 'service']);
      expect(className).toEqual('find-by-id-user.service.ts');
    });
    it('guion separate  case', () => {
      const className = service.classFile(['find_by_id', 'user', 'service']);
      expect(className).toEqual('find-by-id-user.service.ts');
    });
  });

  describe('folderPath', () => {
    it('Camel case', () => {
      const className = service.folderPath(['src/user', 'application', 'Create']);
      expect(className).toEqual('src/user/application/create');
    });
    it('minuscula case', () => {
      const className = service.folderPath(['src/user', 'application', 'create']);
      expect(className).toEqual('src/user/application/create');
    });
    it('DoubleName case', () => {
      const className = service.folderPath(['src/user', 'application', 'findById']);
      expect(className).toEqual('src/user/application/find-by-id');
    });
    it('guion separate  case', () => {
      const className = service.folderPath(['src/user', 'application', 'find-by-id']);
      expect(className).toEqual('src/user/application/find-by-id');
    });
    it('guion separate  case', () => {
      const className = service.folderPath(['src/user', 'application', 'find-By-Id']);
      expect(className).toEqual('src/user/application/find-by-id');
    });
    it('guion separate  case', () => {
      const className = service.folderPath(['src/user', 'application', 'find_by_id']);
      expect(className).toEqual('src/user/application/find-by-id');
    });
    it('guion separate  case', () => {
      const className = service.folderPath(['src/user', 'application/CreateById', 'find_by_id']);
      expect(className).toEqual('src/user/application/create-by-id/find-by-id');
    });
    it('guion separate  case', () => {
      const className = service.folderPath(['src/user', 'application/create_By-id', 'find_by_id']);
      expect(className).toEqual('src/user/application/create-by-id/find-by-id');
    });
  });
});
