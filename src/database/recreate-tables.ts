import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from '../config/database-config';

(async () => {
  const options: DataSourceOptions = { ...databaseConfig };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  console.log('Recreating all tables...');
  await dataSource.synchronize(true).finally(() => console.log('---------------------------\n'));
})();
