import { Injectable } from '@nestjs/common';
import { Role} from 'src/core/models/roles';
import { BaseService } from 'src/core/services/base.service';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService extends BaseService<Role>{
    constructor(repository : RolesRepository){
        super(repository)
    }


    async getAll() : Promise<Role[]>{
        return this.repository.findAll();
    }

}
