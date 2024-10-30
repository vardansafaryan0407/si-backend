import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Project } from "src/core/models/projects";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()
export class ProjectsRepository extends BaseRepository<Project>{
    constructor(@InjectModel(Project) model : typeof Project){
        super(model)
    }
}