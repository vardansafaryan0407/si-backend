import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/core/repositories/base.repository";
import { ProjectPositionApplication } from "./project-position-application";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProjectPositionApplicationRepository extends BaseRepository<ProjectPositionApplication>{
    constructor(@InjectModel(ProjectPositionApplication) model : typeof ProjectPositionApplication){
        super(model)
    }

}