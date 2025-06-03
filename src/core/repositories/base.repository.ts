import {IBaseRepository} from '../interfaces/base.repository';
import {Model, ModelCtor} from 'sequelize-typescript';
import {FindOptions} from 'sequelize';
import {IBaseSearchParams} from '../interfaces/base-search-params';
import {DEFAULT_LIMIT, DEFAULT_PAGE} from '../constants/app.constants';

export class BaseRepository<T extends Model> implements IBaseRepository {
    constructor(protected readonly model: ModelCtor<T>) {
    }

    async findAll(): Promise<T[]> {
        return this.model.findAll();
    }

    public async create(data: any): Promise<T> {
        return this.model.create(data);
    }

    public async delete(id: number): Promise<void> {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }
        await record.destroy();
    }

    public async update(id: number, data: any): Promise<T> {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }
        await record.update(data);
        return record;
    }

    public async findById(id: number): Promise<T> {
        return this.model.findByPk(id);
    }

    public async findOne(searchParams: IBaseSearchParams): Promise<T> {
        return this.model.findOne(searchParams);
    }

    public async list(searchParams: IBaseSearchParams): Promise<T[]> {
        const options: FindOptions = {};
        const {where, include, pagination, order} = searchParams;
        if (where) {
            options.where = where;
        }
        if (include) {
            options.include = include;
        }
        if (order) {
            options.order = order;
        }

        options.limit = +(pagination.limit || DEFAULT_LIMIT);
        options.offset = +(pagination.page || DEFAULT_PAGE * options.limit);
        return this.model.findAll(options);
    }
}
