import { Injectable } from '@nestjs/common';
import { User } from 'src/core/models/users';
import { BaseService } from 'src/core/services/base.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService extends BaseService<User> {
    constructor (repository : UsersRepository){
        super(repository)
    }


    async getAll() : Promise<User[]>{
        return this.repository.findAll();
    }
}
