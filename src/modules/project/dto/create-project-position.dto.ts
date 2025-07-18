import { IsNotEmpty, IsOptional, IsNumber, IsString, IsBoolean, IsArray, Min, Max } from 'class-validator';

export class CreateProjectPositionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  country_id: number;

  @IsNotEmpty()
  @IsNumber()
  role_id: number;

  @IsNotEmpty()
  @IsNumber()
  project_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Equity should be 1 percent minimum' })
  @Max(100, { message: 'Equity should be 100 percent maximum' })
  equity_percentage: number;


  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  skill_ids?: number[];
}