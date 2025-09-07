import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { CreateProjectMemberDto } from '../dto/create-project-member.dto';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { IUserSession } from 'src/core/interfaces/user-session';
import { ProjectMemberService } from './project-member.service';

@Controller('project-member')
export class ProjectMemberController {
  constructor(
    private projectMemberService: ProjectMemberService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createMember(
    @Body() createMemberData: CreateProjectMemberDto,
    @GetUser() user: IUserSession,
  ) {
    return await this.projectMemberService.create(createMemberData);
  }

  @UseGuards(AuthGuard)
  @Get('/project/:projectId')
  async getMembersByProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectMemberService.list();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getMemberById(@Param('id', ParseIntPipe) id: number) {
    return this.projectMemberService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteMember(@Param('id', ParseIntPipe) id: number) {
    return this.projectMemberService.delete(id);
  }
}
