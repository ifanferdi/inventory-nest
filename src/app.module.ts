import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './application/users/user.module';
import { ProductModule } from './application/product/product.module';
import { CategoryModule } from './application/category/category.module';
import { CategoryController } from './application/category/category.controller';
import { ProductController } from './application/product/product.controller';
import { databaseConfig } from './config/database-config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...databaseConfig }),
    UserModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [CategoryController, ProductController],
})
export class AppModule {}
