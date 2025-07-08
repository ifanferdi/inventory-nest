import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import pagination from '../../helpers/pagination';
import { FindUserDto } from './dto/find-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdDto } from './dto/find-by-id.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return {
      message: 'User created successfully..',
      data: await this.userService.create(body),
    };
  }

  @Get()
  async findAll(@Query() query: FindUserDto) {
    let { limit, page } = query;

    const [users, total] = await this.userService.findAll(query);

    return pagination(page, limit, total, users);
  }

  @Get(':id')
  async findOne(@Param() params: FindByIdDto) {
    const user = await this.userService.findOne({ id: +params.id });
    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  @Patch(':id')
  async update(@Param() params: FindByIdDto, @Body() body: UpdateUserDto) {
    const id = +params.id;
    await this.findOne(params);

    const user = await this.userService.update(id, body);

    return { message: 'User updated successfully.', data: user };
  }

  @Delete(':id')
  async remove(@Param() params: FindByIdDto) {
    const user = await this.findOne(params);

    await this.userService.remove(user);

    return { message: 'User deleted successfully.' };
  }
}
