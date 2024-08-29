import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from '../../application/product/entities/product.entity';
import { Category } from '../../application/category/entities/category.entity';
import { faker } from '@faker-js/faker';

export default class DatabaseSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
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
            categories: [faker.helpers.arrayElement(categories)],
          });
        }),
    );
    await productRepository.save(products).finally(() => console.log('Product Seeder : DONE\n'));
  }
}
