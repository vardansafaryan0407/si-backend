import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role} from "src/core/models/roles";
import { BaseRepository } from "src/core/repositories/base.repository";

Injectable()
export class RolesRepository extends BaseRepository<Role>{
    constructor(@InjectModel(Role) model : typeof Role){
        super(model)
    }
}