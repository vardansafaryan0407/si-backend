import { IPaginationParams } from './pagination';

export interface IBaseSearchParams {
  where?: any;
  pagination?: IPaginationParams;
  limit? : any;
  offset? : any;
  order?: Array<[string, 'ASC' | 'DESC']>;
  include?: any[];
  subQuery?: boolean;
}
