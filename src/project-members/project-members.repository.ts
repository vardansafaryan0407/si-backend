import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProjectMembers } from "src/core/models/project.members";
import { BaseRepository } from "src/core/repositories/base.repository";


@Injectable()
export class ProjectMembersRepository extends BaseRepository<ProjectMembers>{
    constructor(@InjectModel(ProjectMembers) model : typeof ProjectMembers){
        super(model)
    }
}