import { Injectable } from '@nestjs/common';
import { Role} from 'src/core/models/role';
import { BaseService } from 'src/core/services/base.service';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService extends BaseService<Role>{
    constructor(repository : RolesRepository){
        super(repository)
    }
}
