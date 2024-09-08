import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from './config';
import { User } from '../application/users/entities/user.entity';
import { Product } from '../application/product/entities/product.entity';
import { Category } from '../application/category/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('database.host'),
      port: +this.config.get('database.port'),
      username: this.config.get('database.username'),
      password: this.config.get('database.password'),
      database: this.config.get('database.name'),
      entities: [User, Product, Category],
      synchronize: true,
    };
  }
}
