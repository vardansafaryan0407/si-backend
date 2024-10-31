import { Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/core/models/user';

@Controller('users')
export class UsersController {

    constructor(private usersService : UsersService){}

    @Get()
    async getAll() : Promise<User[]>{
        return this.usersService.findAll();
    }


    @Post('')
    public async createUser() {

    }


    @Put('')
    public async updateCurrentUser() {

    }
}
