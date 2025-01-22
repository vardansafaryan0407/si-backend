import { IPaginationParams } from './pagination';

export interface IBaseSearchParams {
  where?: any;
  pagination?: IPaginationParams;
  order?: Array<[string, 'ASC' | 'DESC']>;
  include?: any[];
}
