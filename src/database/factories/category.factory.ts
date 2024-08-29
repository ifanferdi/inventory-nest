import { setSeederFactory } from 'typeorm-extension';
import { Category } from '../../application/category/entities/category.entity';

export default setSeederFactory(Category, (faker) => {
  const category = new Category();

  category.name = faker.vehicle.type();

  return category;
});
