import {Controller, Get, Post, Put, Request, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user";
import {AuthGuard} from "src/core/guards/auth.guard";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @UseGuards(AuthGuard)
    @Get('')
    public async getCurrentUser(@Request() req) {
        return req.user
    }


    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }


    @Post('')
    public async createUser() {

    }

    @Put('')
    public async updateCurrentUser() {

    }
}
