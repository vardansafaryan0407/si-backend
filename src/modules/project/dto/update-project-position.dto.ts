import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class UpdateProjectPositionDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  equity: number;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @IsNumber()
  @IsNotEmpty()
  country_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber()
  skills: number[];
}