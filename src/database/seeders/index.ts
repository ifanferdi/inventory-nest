import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import DatabaseSeeder from './database-seeder';
import ProductFactory from '../factories/product.factory';
import CategoryFactory from '../factories/category.factory';
import * as process from 'node:process';
import config from '../../config/config';
import { User } from '../../application/users/entities/user.entity';
import { Product } from '../../application/product/entities/product.entity';
import { Category } from '../../application/category/entities/category.entity';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: config().database.host,
    port: parseInt(config().database.port),
    username: config().database.username,
    password: config().database.password,
    database: config().database.name,
    entities: [User, Product, Category],
    synchronize: true,

    seeds: [DatabaseSeeder],
    factories: [ProductFactory, CategoryFactory],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource).finally(() => process.exit());
})();
