import {IPaginationParams} from "../interfaces/pagination";
import {IBaseRepository} from "../interfaces/base.repository";

export class BaseRepository implements IBaseRepository {


    public async create(data) {
        return true
    }

    public async delete(id: number) {
        return true
    }

    public async update(id: number) {
        return true
    }

    public async findById(id: number) {
        return true
    }

    public async find(searchParams) {

    }

    public async list(paginationParams: IPaginationParams, searchParams: any) {

    }
}
