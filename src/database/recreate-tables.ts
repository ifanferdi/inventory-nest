import { DataSource, DataSourceOptions } from 'typeorm';
import { dropDatabase } from 'typeorm-extension';
import config from '../config/config';
import { User } from '../application/users/entities/user.entity';
import { Product } from '../application/product/entities/product.entity';
import { Category } from '../application/category/entities/category.entity';
import { initializeInstance } from 'ts-loader/dist/instances';
import { databaseConfig } from '../config/database-config';

(async () => {
  const options: DataSourceOptions = { ...databaseConfig };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  console.log('Recreating all tables...');
  await dataSource.synchronize(true).finally(() => console.log('---------------------------\n'));
})();
