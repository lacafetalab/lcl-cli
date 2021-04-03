import { factory } from './service-factory';

async function main() {
  const jsonData = factory.ymlToJsonService.getData(factory.ymlToJsonService.relativePath() + '/config-cli');
  const collectionAggregate = factory.readSkeletonDataService.readData(jsonData);
  await factory.selectAggregate.execute(collectionAggregate);
}

main().finally(() => {
  console.log('see you!');
});
