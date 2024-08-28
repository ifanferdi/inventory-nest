import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class GetProductDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page: number = 1;

  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @IsString()
  @IsOptional()
  @IsIn(['id', 'title', 'price', 'stock'])
  sort: string = 'title';

  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortType: string = 'asc';

  @IsString()
  @IsOptional()
  category: string;
}
