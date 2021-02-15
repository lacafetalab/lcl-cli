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
            const path = `${relativePath}/get_files`;
            const files = service.getFiles(path);
            const data = service.readFiles(files, path);
            expect(data.length).toEqual(1);
            expect(data['User']).toBeDefined();
        });
    });
});
