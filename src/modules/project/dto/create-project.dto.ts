import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateProjectPositionDto } from './create-project-position.dto';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  industries: number;

  @IsNotEmpty()
  country: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectPositionDto)
  positions: CreateProjectPositionDto[];
}

