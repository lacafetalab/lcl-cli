import { YmlToJsonService } from '../modules/load-data/application/yml-to-json/yml-to-json.service';
import { ReadSkeletonDataService } from '../modules/load-data/application/read-skeleton-data/read-skeleton-data.service';
import { SelectAggregate } from './select-aggregate/select-aggregate';

async function main() {
  const ymlToJsonService = new YmlToJsonService();
  const readSkeletonDataService = new ReadSkeletonDataService();
  const selectAggregate = new SelectAggregate();

  const jsonData = ymlToJsonService.getData(ymlToJsonService.relativePath() + '/config-cli');
  const collectionAggregate = readSkeletonDataService.readData(jsonData);
  await selectAggregate.execute(collectionAggregate);
}

main().finally(() => {
  console.log('see you!');
});
