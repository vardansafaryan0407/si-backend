import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ProjectApplyDto } from '../dto/project-apply.dto';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { IUserSession } from 'src/core/interfaces/user-session';
import { ProjectMemberApplicationService } from '../services/project-member-application.service';

@Controller('project-member')
export class ProjectMemberController {
  constructor(
    private projectMemberApplicationService: ProjectMemberApplicationService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/apply/:id')
  async applyProject(
    @Param('id', ParseIntPipe) memberId: number,
    @Body() projectApplyData: ProjectApplyDto,
    @GetUser() user: IUserSession,
  ) {
    return await this.projectMemberApplicationService.projectApply(
      memberId,
      user.id,
      projectApplyData,
    );
  }
}
