import { Injectable } from '@nestjs/common';

import * as path from 'path';
import { DataSkeleton } from '../../domain/DataSkeleton';
import { CollectionData } from '../../domain/CollectionData';

const fs = require('fs');
const YAML = require('yaml');

@Injectable()
export class ReadYamlService {
  relativePath() {
    return process.cwd();
  }

  getFiles(pathConfig: string = null): string[] {
    const pathFiles = pathConfig ? pathConfig : this.relativePath();
    if (!fs.existsSync(pathFiles)) {
      throw Error('el folder no existe');
    }
    const listFile: string[] = [];
    // tslint:disable-next-line:only-arrow-functions
    fs.readdirSync(pathFiles).forEach(function (file: string) {
      listFile.push(file);
    });

    return listFile;
  }

  readFiles(files: string[], pathConfig: string): DataSkeleton[] {
    return files.map((fileName) => {
      const file = fs.readFileSync(path.join(pathConfig, fileName), 'utf8');
      const data = YAML.parse(file);
      return DataSkeleton.create(data);
    });
  }

  process(items: DataSkeleton[]): DataSkeleton[] {
    return items.map((item) => {
      item.event.setDefaultValue(item.name.value);
      item.repository.pk.setDefaultValue();
      return item;
    });
  }

  processCollection(process: DataSkeleton[]): CollectionData {
    const collection = new CollectionData(process);
    collection.collections.forEach((e) => {
      //e.repository.setColumnDefaultValue(e.name.value, collection);
    });
    return collection;
  }

  getCollection(pathFolder: string = null): CollectionData {
    //const pathFolde = pathFolder || `/templates/config/lclcli/config`;
    //const relativePath = `${this.relativePath()}${pathFolde}`;
    //const files = this.getFiles(relativePath);
    //const data = this.readFiles(files, relativePath);
    //const process = this.process(data);
    //return this.processCollection(process);
    return null;
  }
}
