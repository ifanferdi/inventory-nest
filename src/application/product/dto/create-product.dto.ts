import { IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
