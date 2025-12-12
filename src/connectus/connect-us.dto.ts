import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConnectUsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
