import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  country: number;

  @IsNotEmpty()
  industries: number;
}
