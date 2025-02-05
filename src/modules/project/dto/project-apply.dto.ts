import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ProjectApplyDto {
  projectId: number;

  @IsNotEmpty()
  @IsNumber()
  equity: number;

  @IsNotEmpty()
  message: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
