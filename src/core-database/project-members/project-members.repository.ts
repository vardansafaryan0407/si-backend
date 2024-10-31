import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProjectMember } from "src/core/models/project-member";
import { BaseRepository } from "src/core/repositories/base.repository";


@Injectable()
export class ProjectMembersRepository extends BaseRepository<ProjectMember>{
    constructor(@InjectModel(ProjectMember) model : typeof ProjectMember){
        super(model)
    }
}