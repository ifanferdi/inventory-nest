import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../application/users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  user.fullname = faker.person.fullName();
  user.username = faker.internet.userName();
  user.password = 'password';

  return user;
});
