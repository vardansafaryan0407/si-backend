import { IPaginationParams } from '../interfaces/pagination';
import { BaseRepository } from '../repositories/base.repository';
import { Model } from 'sequelize-typescript';
import { IBaseSearchParams } from '../interfaces/base-search-params';

export class BaseService<T extends Model> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  public async create(data: any) {
    return this.repository.create(data);
  }

  public async delete(id: number) {
    return true;
  }

  public async update(id: number) {
    return true;
  }

  public async getById(id: number) {
    return this.repository.findById(id);
  }

  public async list(paginationParams: IPaginationParams = {}) {
    return this.repository.findAll();
  }

  public async findOne(searchParams: IBaseSearchParams) {
    return this.repository.findOne(searchParams);
  }

  public async findAll() {
    return this.repository.findAll();
  }
}
