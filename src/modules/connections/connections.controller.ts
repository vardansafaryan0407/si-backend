import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { CreateConnectInviteDto } from './create-connection-invite.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post('invite')
  sendInvite(@Body() dto: CreateConnectInviteDto) {
    return this.connectionsService.sendInvite(dto.senderId, dto.receiverId);
  }

  @Post('invite/:id/accept')
  acceptInvite(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.connectionsService.acceptInvite(id, userId);
  }

  @Post('invite/:id/reject')
  rejectInvite(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.connectionsService.rejectInvite(id, userId);
  }

  @Get(':userId/friends')
  getFriends(@Param('userId', ParseIntPipe) userId: number) {
    return this.connectionsService.getFriends(userId);
  }

  @Get(':userId/invites')
  getInvites(@Param('userId', ParseIntPipe) userId: number) {
    return this.connectionsService.getInvites(userId);
  }
}
