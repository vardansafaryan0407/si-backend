import {Injectable} from '@nestjs/common';
import {BaseRepository} from "../../core/repositories/base.repository";
import { User } from 'src/core/models/user';
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class AuthRepository extends BaseRepository<User> {

    constructor(@InjectModel(User) model: typeof User) {
        super(model);
    }
}
