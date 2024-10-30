import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from 'src/core/models/users';

@Controller('users')
export class UsersController {

    constructor(private usersService : UsersService){}

    @Get()
    async getAll() : Promise<Users[]>{
        return this.usersService.getAll();
    }
}
