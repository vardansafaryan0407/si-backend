import {IPaginationParams} from "../interfaces/pagination";
import {IBaseRepository} from "../interfaces/base.repository";
import {Model, ModelCtor} from "sequelize-typescript";

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

    public async findOne(searchParams): Promise<T> {
        return this.model.findOne(searchParams)
    }


    public async list( searchParams: any, paginationParams: IPaginationParams): Promise<T[]> {
        return this.model.findAll({where: searchParams, limit: paginationParams.limit, offset: paginationParams.offset})
    }
}
