import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Projects } from "src/core/models/projects";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()
export class ProjectsRepository extends BaseRepository<Projects>{
    constructor(@InjectModel(Projects) model : typeof Projects){
        super(model)
    }
}