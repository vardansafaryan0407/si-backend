import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserSkills } from "src/core/models/user.skills";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()
export class UserSkillsRepository extends BaseRepository<UserSkills>{
    constructor(@InjectModel(UserSkills) model : typeof UserSkills){
        super(model)
    }

}