import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

class EquityRange {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;
}

export class UpdateProjectPositionDto {
  id: number;

  project_id: number;

  @ValidateNested()
  @Type(() => EquityRange)
  equity: EquityRange;

  role_id: number;

  country: number;

  skills: number[];
}
