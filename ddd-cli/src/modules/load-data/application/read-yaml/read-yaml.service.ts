import {Injectable} from '@nestjs/common';

@Injectable()
export class ReadYamlService {
    relativePath() {
        return process.cwd();
    }
}
