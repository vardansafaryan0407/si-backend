import { IsNotEmpty } from 'class-validator';

export class CreateProjectPositionDto {
  @IsNotEmpty()
  equity: {
    min: number;
    max: number;
  };

  @IsNotEmpty()
  role_id: number;

  @IsNotEmpty()
  country: number;

  @IsNotEmpty()
  skills: number[];

  project_id?: number;
}
