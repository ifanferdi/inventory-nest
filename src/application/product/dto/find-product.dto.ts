import { IsArray, IsIn, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class FindProductDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page: number = 1;

  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @IsArray()
  @IsOptional()
  @IsIn(['id', 'title', 'price', 'stock', 'createdAt', 'updatedAt'], { each: true })
  sort: string[] = ['title'];

  @IsArray()
  @IsOptional()
  @IsIn(['asc', 'desc'], { each: true })
  sortType: string[] = ['asc'];

  @IsArray()
  @IsOptional()
  @IsIn(['categories', 'author'], { each: true })
  with: string[];

  @IsArray()
  @IsOptional()
  attributes: string[] = [];

  @IsString()
  @IsOptional()
  q: string;

  @IsString()
  @IsOptional()
  'category.q': string;

  @IsString()
  @IsOptional()
  'author.q': string;
}
