import { YmlToJsonService } from './yml-to-json.service';

describe('YmlToJsonService', () => {
  let service: YmlToJsonService;
  let relativePath: string;

  beforeEach(async () => {
    service = new YmlToJsonService();
    relativePath = `${service.relativePath()}/templates/config/test/yml-to-json`;
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
      const data = service.getData(`${relativePath}/read_files`);
      expect(data.length).toEqual(1);
      expect(data[0]).toBeDefined();
      expect(data[0].path).toEqual('src/user-a');
      expect(data[0].nameSpace).toEqual('app.userA');
      expect(data[0].name).toEqual('UserA');

      expect(data[0].properties.id).toEqual('id');
      expect(data[0].properties['name']).toEqual('string');
    });
  });
});
