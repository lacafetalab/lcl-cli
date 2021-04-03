import { factory } from './service-factory';

async function main() {
  const pathConfigYaml = factory.ymlToJsonService.relativePath() + '/config-cli';
  const jsonData = factory.ymlToJsonService.getData(pathConfigYaml);
  const collectionAggregate = factory.readSkeletonDataService.readData(jsonData);
  const aggregate = await factory.selectAggregate.execute(collectionAggregate);
  await factory.menuAggregate.execute(aggregate);
}

main().finally(() => {
  console.log('see you!');
});
