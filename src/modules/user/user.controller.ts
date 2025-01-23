import {Body, Controller, Get,Param,Patch,Post,Request, UseGuards} from "@nestjs/common";
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
     const userId = req.user.id 
     return this.userService.findOne(userId)

    }


    @Get('list')
    async getAll(): Promise<User[]> {
        return this.userService.findAll();
    }


    @Get(':id')
    async getById(@Param('id') id: number) {
      return this.userService.getById(id);
    }

    @Post('')
    public async createUser() {
    }


    @Patch(':id')
    async updateCurrentUser(@Param('id') id: number, @Body() userData: User) : Promise<User> {
      return this.userService.update(id, userData);
    }
    }

