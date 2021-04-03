import { factory } from './service-factory';

async function main() {
  const pathConfigYaml = factory.ymlToJsonService.relativePath() + '/config-cli';
  const jsonData = factory.ymlToJsonService.getData(pathConfigYaml);
  const collectionAggregate = factory.readSkeletonDataService.readData(jsonData);
  await factory.selectAggregate.execute(collectionAggregate);
}

main().finally(() => {
  console.log('see you!');
});
