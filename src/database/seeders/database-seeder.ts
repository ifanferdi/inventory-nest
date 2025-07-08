import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from '../../application/product/entities/product.entity';
import { User } from '../../application/users/entities/user.entity';
import { Category } from '../../application/category/entities/category.entity';
import * as _ from 'lodash';

export default class DatabaseSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    try {
      // RUNNING SEEDER USERS
      console.log('User Seeder : RUNNING');
      const userFactory = factoryManager.get(User);
      const users = await userFactory
        .saveMany(10)
        .finally(() => console.log('User Seeder : DONE\n'));

      // RUNNING SEEDER CATEGORIES
      console.log('Category Seeder : RUNNING');
      const categoryFactory = factoryManager.get(Category);
      const categories = await categoryFactory
        .saveMany(10)
        .finally(() => console.log('Category Seeder : DONE\n'));

      // RUNNING SEEDER PRODUCTS
      console.log('Product Seeder : RUNNING');
      const productRepository = dataSource.getRepository(Product);
      const productFactory = factoryManager.get(Product);
      const products = await Promise.all(
        Array(30)
          .fill('')
          .map(async () => {
            return await productFactory.make({
              author: _.sample(users),
              categories: _.uniq(_.sampleSize(categories, _.random(1, categories.length))),
            });
          }),
      );
      await productRepository
        .save(products)
        .catch((e) => console.log(e))
        .finally(() => console.log('Product Seeder : DONE\n'));
    } catch (e) {
      console.error(e);
    }
  }
}
