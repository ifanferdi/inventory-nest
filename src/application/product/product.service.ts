import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { GetProductDto } from './dto/get-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  create(data: CreateProductDto) {
    const product = this.productRepository.create(data);

    return this.productRepository.save(product);
  }

  async findAll(params: GetProductDto) {
    let { limit: take, page, sort, sortType, category } = params;
    if (take === -1) take = null;
    const skip = (page - 1) * take; // OFFSET

    const options = { skip, take, sort, sortType };

    return await this.productRepository.findAndCount(options);
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateProductDto) {
    const product = this.productRepository.create(data);
    return await this.productRepository.update(id, product);
  }

  async remove(product: Product, force: boolean = false) {
    if (force) return await this.productRepository.remove(product);

    return await this.productRepository.softRemove(product);
  }
}
