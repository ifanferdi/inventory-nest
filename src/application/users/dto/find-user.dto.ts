import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class FindUserDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page: number = 1;

  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @IsString()
  @IsOptional()
  @IsIn(['id', 'fullname', 'username'])
  sort: string = 'fullname';

  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortType: string = 'asc';
}
