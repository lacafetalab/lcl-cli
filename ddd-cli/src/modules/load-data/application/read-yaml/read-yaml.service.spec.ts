import {Test, TestingModule} from '@nestjs/testing';
import {ReadYamlService} from './read-yaml.service';
import {count} from "rxjs/operators";

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
});
