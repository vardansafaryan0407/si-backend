import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateProjectPositionApplicationDto {
  @IsNotEmpty()
  @IsNumber()
  position_id: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Equity should be 1 percent minimum' })
  @Max(100, { message: 'Equity should be 100 percent maximum' })
  equity?: number;
}

export class CreateInvitePositionDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  position_id: number;
}
