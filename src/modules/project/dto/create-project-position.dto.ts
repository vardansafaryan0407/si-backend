import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

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
  description: string;

  @IsNotEmpty()
  skills: number[];

  // Absent when the position travels inside a new project; required when it is added to
  // an existing one (the controller checks that, and that the caller owns the project).
  @IsOptional()
  @IsInt()
  project_id?: number;
}
