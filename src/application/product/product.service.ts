import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { IProductPagination } from '../../types/interfaces/product-pagination-interface';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  create(data: CreateProductDto) {
    const product = this.productRepository.create(data);

    return this.productRepository.save(product);
  }

  async findAll(params: IProductPagination) {
    const query = this.query(params);

    return await this.productRepository.findAndCount(query);
  }

  query(params: IProductPagination): FindManyOptions {
    let {
      limit: take = 10,
      page = 1,
      sort = ['updatedAt'],
      sortType = ['desc'],
      attributes = [],
      q,
    } = params;
    let { with: relations } = params;
    const where: any = {};

    if (take === -1) take = null;
    const skip = (page - 1) * take; // OFFSET

    const order = {};
    sort.map((val, index) => (order[val] = sortType[index] ?? 'asc'));

    if (q) where.title = ILike(`%${q}%`);

    // M:N Relationship
    if (params['category.q']) {
      if (!relations?.includes('categories')) relations = ['categories'];
      where.categories = { name: ILike(`%${params['category.q']}%`) };
    }

    // 1:M Relationship
    if (params['author.q']) {
      if (!relations?.includes('author')) relations = ['author'];
      where.author = { fullname: ILike(`%${params['author.q']}%`) };
    }

    return { where, skip, order, take, select: attributes, relations };
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

  async findMin(column: any, query: FindOptionsWhere<Product> = {}) {
    return await this.productRepository.minimum(column, query);
  }

  async findMax(column: any, query: FindOptionsWhere<Product> = {}): Promise<any> {
    return await this.productRepository.maximum(column, query);
  }

  async group() {
    return await this.productRepository.find();
  }
}
