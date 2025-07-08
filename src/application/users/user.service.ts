import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUser as IFindOneUser } from '../../types/interfaces/find-one-user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(payload: CreateUserDto) {
    const user = this.userRepository.create(payload);

    return this.userRepository.save(user);
  }

  async findAll(params: FindUserDto) {
    let { limit: take, page, sort, sortType } = params;
    if (take === -1) take = null;
    const skip = (page - 1) * take; // OFFSET

    const options = { skip, take, sort, sortType };

    return await this.userRepository.findAndCount(options);
  }

  async findOne(payload: IFindOneUser) {
    return await this.userRepository.findOneBy(payload);
  }

  async update(id: number, data: UpdateUserDto) {
    const product = this.userRepository.create(data);
    return await this.userRepository.update(id, product);
  }

  async remove(product: User, force: boolean = false) {
    if (force) return await this.userRepository.remove(product);

    return await this.userRepository.softRemove(product);
  }
}
