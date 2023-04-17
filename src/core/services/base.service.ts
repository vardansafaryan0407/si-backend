import {BaseRepository} from "../repositories/base.repository";
import {IPaginationParams} from "../interfaces/pagination";

export class BaseService {

    constructor(protected repository: BaseRepository) {
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

    public async list(paginationParams: IPaginationParams) {

    }
}
