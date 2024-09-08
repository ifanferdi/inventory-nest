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
import { GetProductDto } from './dto/get-product.dto';
import pagination from '../../helpers/pagination';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return {
      message: 'Product created successfully.',
      data: await this.productService.create(body),
    };
  }

  @Get()
  async findAll(@Query() query: GetProductDto) {
    let { limit, page } = query;

    const [products, total] = await this.productService.findAll(query);

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

    await this.productService.update(+id, body);

    return { message: 'Product updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const product = await this.findOne(+id);

    await this.productService.remove(product);

    return { message: 'Product deleted successfully' };
  }
}
