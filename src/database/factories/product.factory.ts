import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../application/product/entities/product.entity';
import moment from 'moment';

export default setSeederFactory(Product, (faker) => {
  const product = new Product();

  product.title = faker.vehicle.vehicle();
  product.price = faker.number.int({ min: 10000, max: 1000000 });
  product.stock = faker.number.int({ min: 1, max: 1000 });
  product.description = faker.helpers.arrayElement([
    null,
    faker.word.words({ count: { min: 6, max: 15 } }),
  ]);
  product.expiredDate = faker.date.between({
    from: moment().subtract(7, 'day').toDate(),
    to: Date.now(),
  });

  return product;
});
