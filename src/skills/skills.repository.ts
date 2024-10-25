import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Skills } from "src/core/models/skills";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()
export class SkillsRepository extends BaseRepository<Skills>{
    constructor(@InjectModel(Skills) model : typeof Skills){
        super(model)
    }
}