import {Injectable} from '@nestjs/common';
import {BaseRepository} from "../../core/repositories/base.repository";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../../modules/user/user";

@Injectable()
export class AuthRepository extends BaseRepository<User> {

    constructor(@InjectModel(User) model: typeof User) {
        super(model);
    }
}
