import { Injectable } from '@nestjs/common';
import { Roles } from 'src/core/models/roles';
import { BaseService } from 'src/core/services/base.service';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService extends BaseService<Roles>{
    constructor(repository : RolesRepository){
        super(repository)
    }
}
