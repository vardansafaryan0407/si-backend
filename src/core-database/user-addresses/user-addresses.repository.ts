import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserAddress } from "src/core/models/user-addresses";
import { BaseRepository } from "src/core/repositories/base.repository";


@Injectable()
export class UserAddressesRepository extends BaseRepository<UserAddress>{
    constructor(@InjectModel(UserAddress) model : typeof UserAddress){
        super(model)
    }
}