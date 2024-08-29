import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import DatabaseSeeder from './database-seeder';
import ProductFactory from '../factories/product.factory';
import CategoryFactory from '../factories/category.factory';
import * as process from 'node:process';
import { databaseConfig } from '../../config/database-config';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    ...databaseConfig,

    seeds: [DatabaseSeeder],
    factories: [ProductFactory, CategoryFactory],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource).finally(() => process.exit());
})();
