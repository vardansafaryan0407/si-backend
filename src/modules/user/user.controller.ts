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
import { UserUpdateDto } from './user-update.dto';
import { GetUser } from '../../core/decorators/get-user.decorator';
import { IUserSession } from '../../core/interfaces/user-session';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('')
  public async getCurrentUser(@Request() req) {
    const userId = req.user.id;
    return this.userService.find(userId);
  }

  @Get('list')
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async updateCurrentUser(
    @Body() userData: UserUpdateDto,
    @GetUser() user: IUserSession,
  ): Promise<User> {
    return this.userService.updateUserWithSkills(user.id, userData);
  }
}
