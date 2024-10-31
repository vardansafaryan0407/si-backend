
import {BaseService} from "../../core/services/base.service";
import {UserRepository} from "./user.repository";
import {User} from "./user";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(repository: UserRepository) {
        super(repository);
    }
}


