import {Injectable} from '@nestjs/common';
import {RolesRepository} from './roles.repository';
import {BaseService} from "../../../core/services/base.service";
import {Role} from "../../../core/models/role";

@Injectable()
export class RolesService extends BaseService<Role> {
    constructor(repository: RolesRepository) {
        super(repository)
    }
}
