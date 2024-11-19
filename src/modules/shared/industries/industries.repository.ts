import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import { Industry } from "src/core/models/industry";
import {BaseRepository} from "src/core/repositories/base.repository";

@Injectable()

export class IndustriesRepository extends BaseRepository<Industry> {
    constructor(@InjectModel(Industry) model: typeof Industry) {
        super(model)
    }
}
