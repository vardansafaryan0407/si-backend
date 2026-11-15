import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateInvitePositionDto } from '../dto/create-project-position-application.dto';
import { ProjectInviteService } from './project-invite.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { IUserSession } from 'src/core/interfaces/user-session';

@Controller('project-invite')
export class ProjectInviteController {
  constructor(private projectInviteService: ProjectInviteService) {}

  @UseGuards(AuthGuard)
  @Post(':id/invite')
  async inviteToPosition(
    @Param('id', ParseIntPipe) positionId: number,
    @Body() dto: CreateInvitePositionDto,
    @GetUser() user: IUserSession,
  ) {
    if (dto.user_id === user.id) {
      throw new Error('You cannot invite yourself');
    }
    this.projectInviteService.createInvite(
      {
        ...dto,
        position_id: positionId,
      },
      user.id,
    );
  }
}
