import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "src/core/models/roles";
import { BaseRepository } from "src/core/repositories/base.repository";

Injectable()
export class RolesRepository extends BaseRepository<Roles>{
    constructor(@InjectModel(Roles) model : typeof Roles){
        super(model)
    }
}