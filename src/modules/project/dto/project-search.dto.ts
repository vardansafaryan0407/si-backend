import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { IProjectQueryInterface } from 'si-shared-library';
import { Pagination } from '../../../core/models/pagination';

class EquityFilter {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max?: number;
}

/**
 * The filters of the project search, as the search form sends them: arrays of ids from
 * the dropdowns and an equity range whose ends are null until the visitor types them.
 * Numbers that arrive as strings are converted.
 */
export class ProjectSearchQuery implements IProjectQueryInterface {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  query?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  industries?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  locations?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  roles?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  skills?: number[];

  @IsOptional()
  @ValidateNested()
  @Type(() => EquityFilter)
  equity?: EquityFilter;
}

/**
 * Body of POST /project/search. Both parts are optional: an empty body lists the newest
 * projects with the default page size. Wrong types are a 400 instead of a database error.
 */
export class ProjectSearchDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectSearchQuery)
  query: ProjectSearchQuery = new ProjectSearchQuery();

  @IsOptional()
  @ValidateNested()
  @Type(() => Pagination)
  pagination: Pagination = new Pagination();
}
