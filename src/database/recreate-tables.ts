import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../application/users/entities/user.entity';
import { Product } from '../application/product/entities/product.entity';
import { Category } from '../application/category/entities/category.entity';
import config from '../config/config';

(async () => {
  const options: DataSourceOptions = {
    type: 'postgres',
    host: config().database.host,
    port: +config().database.port,
    username: config().database.username,
    password: config().database.password,
    database: config().database.name,
    entities: [User, Product, Category],
    synchronize: true,
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  console.log('Recreating all tables...');
  await dataSource.synchronize(true).finally(() => console.log('---------------------------\n'));
})();
