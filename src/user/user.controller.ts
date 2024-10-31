import {Controller, Get, Post, Put, UseGuards, Request} from "@nestjs/common";
import {UserService} from "./user.service";
import {AuthGuard} from "../core/guards/auth,guard";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @UseGuards(AuthGuard)
    @Get('')
    public async getCurrentUser(@Request() req) {
        return req.user
    }

    @Post('')
    public async createUser() {

    }

    @Put('')
    public async updateCurrentUser() {

    }
}
