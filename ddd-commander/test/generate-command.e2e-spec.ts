import { cleanRender, DOWN, ENTER, readRender, run } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/application';
describe('command service User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate command User', () => {
    test('select 1) Create Service Command', async () => {
      const result = await run([DOWN, ENTER, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Service Command/);
      expect(result).toMatch(/COMMAND name/);
    });

    test('input command name correct list properties', async () => {
      const result = await run([DOWN, ENTER, ENTER, 'create', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Service Command/);
      expect(result).toMatch(/COMMAND name create/);
      expect(result).toMatch(/User properties/);
      expect(result).toMatch(/id/);
      expect(result).toMatch(/name/);
    });

    test('input command name correct -> view list template', async () => {
      const result = await run([DOWN, ENTER, ENTER, 'create', ENTER, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Service Command/);
      expect(result).toMatch(/COMMAND name create/);
      expect(result).toMatch(/User properties id, name/);
      expect(result).toMatch(/use template/);
      expect(result).toMatch(/create/);
      expect(result).toMatch(/update/);
      expect(result).toMatch(/delete/);
      expect(result).toMatch(/none/);
    });

    test('input command name correct -> select template none', async () => {
      const result = await run([DOWN, ENTER, ENTER, 'create', ENTER, ENTER, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Service Command/);
      expect(result).toMatch(/COMMAND name create/);
      expect(result).toMatch(/User properties id, name/);
      expect(result).toMatch(/use template none/);
      expect(result).toMatch(/\[created\] /);
    });
  });

  describe('generate command User Error', () => {
    test('input name error 1 cracrter', async () => {
      const result = await run([DOWN, ENTER, ENTER, 'c', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Service Command/);
      expect(result).toMatch(/COMMAND name must be at least 3 letters/);
    });

    test('input name error caracteres no permitidos', async () => {
      const result = await run([DOWN, ENTER, ENTER, 'Create-User', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Service Command/);
      expect(result).toMatch(/only caracters de a la a-z A-Z/);
    });
  });

  describe('render command create User', () => {
    test('service -> select template create', async () => {
      await run([DOWN, ENTER, ENTER, 'create', ENTER, ENTER, DOWN, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/create/user-create.service.ts');
      expect(render).toMatch(/export class UserCreateService/);
      expect(render).toMatch(/private repository: UserRepository/);
      expect(render).toMatch(/const user = User.create\(id, name\)/);
    });

    test.only('command -> select template create', async () => {
      await run([DOWN, ENTER, ENTER, 'create', ENTER, ENTER, DOWN, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/create/user-create.command.ts');
      expect(render).toMatch(/export class UserCreateHandler/);
    });
  });
});
