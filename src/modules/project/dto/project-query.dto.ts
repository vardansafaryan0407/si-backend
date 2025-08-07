import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { IProjectQueryInterface } from 'si-shared-library';

export class ProjectQuery implements IProjectQueryInterface {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  industryId?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  locationId?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  roleId?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number;

  @IsOptional()
  equity?: { min?: number; max?: number };
}
