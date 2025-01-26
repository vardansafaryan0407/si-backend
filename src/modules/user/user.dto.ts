import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  skills_id: number;

  @IsNotEmpty()
  country_id: number;
}
