import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/** Query string of GET /positions. Everything is optional. */
export class ListPositionsQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;

  /** Only positions for this role id. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  role?: number;

  /** Only positions for applicants based in this country id. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  country?: number;
}
