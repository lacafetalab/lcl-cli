import { factory } from './service-factory';

async function main() {
  const pathConfigYaml = factory.ymlToJsonService.relativePath() + '/config-cli';
  const jsonData = factory.ymlToJsonService.getData(pathConfigYaml);
  const collectionAggregate = factory.readSkeletonDataService.readData(jsonData);
  const aggregate = await factory.selectAggregate.execute(collectionAggregate);
  const generate = await factory.menuAggregate.execute(aggregate);
  await factory.generateFactory.execute(generate).execute(aggregate, collectionAggregate);
}

main().finally(() => {
  console.log('see you!');
});
