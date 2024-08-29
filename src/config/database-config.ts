import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from './config';
import { User } from '../application/users/entities/user.entity';
import { Product } from '../application/product/entities/product.entity';
import { Category } from '../application/category/entities/category.entity';

export const databaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: config().database.host,
  port: parseInt(config().database.port),
  username: config().database.username,
  password: config().database.password,
  database: config().database.name,
  entities: [User, Product, Category],
  synchronize: true,
};
