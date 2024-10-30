import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/core/models/users';

@Controller('users')
export class UsersController {

    constructor(private usersService : UsersService){}

    @Get()
    async getAll() : Promise<User[]>{
        return this.usersService.getAll();
    }
}
