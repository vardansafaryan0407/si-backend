import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserSkill } from "src/core/models/user-skills";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()
export class UserSkillsRepository extends BaseRepository<UserSkill>{
    constructor(@InjectModel(UserSkill) model : typeof UserSkill){
        super(model)
    }

}