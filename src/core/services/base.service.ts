import {IPaginationParams} from "../interfaces/pagination";
import {BaseRepository} from "../repositories/base.repository";
import {Model} from "sequelize-typescript";

export class BaseService<T extends Model> {

    constructor(protected readonly repository: BaseRepository<T>) {
    }

    public async create(data: any) {
        return this.repository.create(data)
    }

    public async delete(id: number) {
        return true
    }

    public async update(id: number) {
        return true
    }

    public async getById(id: number) {
        return true
    }

    public async list(paginationParams: IPaginationParams = {}) {
        return this.repository.findAll()
    }

    public async findOne(searchParams: object) {
        return this.repository.findOne(searchParams);
    }

    public async findAll() {
        return this.repository.findAll()
    }
}
