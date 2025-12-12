import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  fname: string;
  @IsString()
  @IsNotEmpty()
  lname: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
