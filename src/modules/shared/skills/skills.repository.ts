import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Skill} from "src/core/models/skill";
import {BaseRepository} from "src/core/repositories/base.repository";

@Injectable()
export class SkillsRepository extends BaseRepository<Skill> {
    constructor(@InjectModel(Skill) model: typeof Skill) {
        super(model)
    }
}
