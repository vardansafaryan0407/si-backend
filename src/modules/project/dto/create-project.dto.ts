import { IsNotEmpty } from 'class-validator';
import { CreateProjectPositionDto } from './create-project-position.dto';

export class CreateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  industries: number;

  @IsNotEmpty()
  country: number;

  positions?: CreateProjectPositionDto[];
}
