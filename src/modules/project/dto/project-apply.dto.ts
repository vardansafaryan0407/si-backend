import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class ProjectApplyDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  equity: number;

  @IsNotEmpty()
  message: string;
}
