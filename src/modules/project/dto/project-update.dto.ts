import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { UpdateProjectPositionDto } from './update-project-position.dto';

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

  @IsArray()
  @IsNotEmpty()
  positions: UpdateProjectPositionDto[];
}
