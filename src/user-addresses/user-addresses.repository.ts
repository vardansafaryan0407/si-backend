import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserAddresses } from "src/core/models/user.addresses";
import { BaseRepository } from "src/core/repositories/base.repository";


@Injectable()
export class UserAddressesRepository extends BaseRepository<UserAddresses>{
    constructor(@InjectModel(UserAddresses) model : typeof UserAddresses){
        super(model)
    }
}