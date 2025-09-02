import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { IUserSession } from 'src/core/interfaces/user-session';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @UseGuards(AuthGuard)
  @Post('invite')
  sendInvite(
    @GetUser() user: IUserSession,
    @Body('receiverId', ParseIntPipe) receiverId: number,
  ) {
    return this.connectionsService.sendInvite(user.id, receiverId);
  }

  @UseGuards(AuthGuard)
  @Get('relationship/:id')
  getRelationship(
    @GetUser() user: IUserSession,
    @Param('id', ParseIntPipe) targetUserId: number,
  ) {
    return this.connectionsService.getRelationship(user.id, targetUserId);
  }

  @UseGuards(AuthGuard)
  @Post('invite/:id/accept')
  acceptInvite(
    @GetUser() user: IUserSession,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.connectionsService.acceptInvite(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Post('invite/:id/reject')
  rejectInvite(
    @GetUser() user: IUserSession,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.connectionsService.rejectInvite(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Get('friends')
  getFriends(@GetUser() user: IUserSession) {
    return this.connectionsService.getFriends(user.id);
  }

  @UseGuards(AuthGuard)
  @Get('invites')
  getInvites(@GetUser() user: IUserSession) {
    return this.connectionsService.getInvites(user.id);
  }
}
