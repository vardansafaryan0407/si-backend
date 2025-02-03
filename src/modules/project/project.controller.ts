import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ProjectQuery } from './dto/project-query.dto';
import { Pagination } from '../../core/models/pagination';
import { GetUser } from '../../core/decorators/get-user.decorator';
import { IUserSession } from '../../core/interfaces/user-session';
import { ProjectApplyDto } from './dto/project-apply.dto';
import { ProjectMemberApplicationService } from './services/project-member-application.service';

@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private projectMemberApplicationService: ProjectMemberApplicationService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('')
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: IUserSession,
  ): Promise<void> {
    try {
      await this.projectService.createProject(createProjectDto, user.id);
    } catch (error) {
      return error;
    }
  }

  @Get('')
  async listProjects(
    @Query() query: ProjectQuery,
    @Query() pagination: Pagination,
  ) {
    try {
      return await this.projectService.searchProjects(query, pagination);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/mine')
  async getMyProjects(
    @Query() query: ProjectQuery,
    @Query() pagination: Pagination,
    @GetUser() user: IUserSession,
  ) {
    try {
      return await this.projectService.getUserProjects(user.id, pagination);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.projectService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post('/apply/:id')
  async applyProject(
    @Param('id', ParseIntPipe) projectId: number,
    @Body() projectApplyData: ProjectApplyDto,
    @GetUser() user: IUserSession,
  ) {
    return await this.projectMemberApplicationService.projectApply(
      projectId,
      user.id,
      projectApplyData,
    );
  }
}
