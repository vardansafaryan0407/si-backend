import { IPaginationParams } from '../interfaces/pagination';
import { Type } from 'class-transformer';

export class Pagination implements IPaginationParams {
  @Type(() => Number)
  page: number = 0;

  @Type(() => Number)
  limit: number = 20;
}