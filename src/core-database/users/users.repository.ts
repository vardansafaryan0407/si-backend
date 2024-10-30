import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/core/models/users";
import { BaseRepository } from "src/core/repositories/base.repository";

@Injectable()
export class UsersRepository extends BaseRepository<User>{
    constructor(@InjectModel(User)  model : typeof User){
       super(model)
    }
}
