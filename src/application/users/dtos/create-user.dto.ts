import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;
}
