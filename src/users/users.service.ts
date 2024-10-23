import { Injectable } from '@nestjs/common';
import { Users } from 'src/core/models/users';
import { BaseService } from 'src/core/services/base.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseService<Users> {
    constructor (repository : UsersRepository){
        super(repository)
    }
}
