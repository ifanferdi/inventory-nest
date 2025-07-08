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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import pagination from '../../helpers/pagination';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return {
      message: 'Product created successfully..',
      data: await this.productService.create(body),
    };
  }

  @Get()
  async findAll(@Query() params: FindProductDto) {
    return this.handleFindAll(params);
  }

  @Post('/get')
  async findAllPost(@Body() body: FindProductDto) {
    return this.handleFindAll(body);
  }

  async handleFindAll(params: FindProductDto) {
    let { limit, page } = params;

    const [products, total] = await this.productService.findAll(params);

    return pagination(page, limit, total, products);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productService.findOne(+id);
    if (!product) throw new NotFoundException('Product not found.');

    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    await this.findOne(+id);

    const product = await this.productService.update(+id, body);

    return { message: 'Product updated successfully.', data: product };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const product = await this.findOne(+id);

    await this.productService.remove(product);

    return { message: 'Product deleted successfully.' };
  }

  @Get('/min/:column')
  async findMin(@Param('column') column: string, @Query() params: object = {}) {
    // todo: kasih DTO di params

    const min = await this.productService.findMin(column, params);

    return { message: 'Success.', column, min };
  }

  @Get('/max/:column')
  async findMax(@Param('column') column: string, @Query() params: object = {}) {
    // todo: kasih DTO di params

    const max = await this.productService.findMax(column, params);

    return { message: 'Success.', column, max };
  }

  async group(@Query() params: object = {}) {
    //todo: typeorm ga ada group by query
  }
}
