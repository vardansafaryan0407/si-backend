import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UserUpdateDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('')
  public async getCurrentUser(@Request() req) {
    const userId = req.user.id;
    return this.userService.findOne(userId);
  }

  @Get('list')
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Post('')
  public async createUser() {}

  @UseGuards(AuthGuard)
  @Put('update')
  async updateCurrentUser(@Body() userData: UserUpdateDto): Promise<User> {
    return this.userService.updateUser(id, userData);
  }
}
