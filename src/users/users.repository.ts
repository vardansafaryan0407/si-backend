import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "src/core/models/users";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()
export class UsersRepository extends BaseRepository<Users>{
    constructor(@InjectModel(Users)  model : typeof Users){
       super(model)
    }
}