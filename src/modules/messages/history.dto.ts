import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class HistoryDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 50;

  @Type(() => Number)
  @IsInt()
  partnerId!: number;
}
