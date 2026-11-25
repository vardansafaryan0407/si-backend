import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ProjectQuery } from './dto/project-query.dto';
import { ProjectSearchDto } from './dto/project-search.dto';
import { ProjectAccessService } from './services/project-access.service';
import { GetUser } from '../../core/decorators/get-user.decorator';
import { IUserSession } from '../../core/interfaces/user-session';
import { UpdateProjectDto } from './dto/project-update.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private projectAccess: ProjectAccessService,
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
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/mine-with-positions')
  async userProjectsWithPositions(
    @Body() query: ProjectQuery,

    @GetUser() user: IUserSession,
  ) {
    try {
      return await this.projectService.getUserProjectsWithPositions(
        user.id,
        query,
      );
    } catch (error) {
      return error;
    }
  }

  @Post('/search')
  async listProjects(@Body() body: ProjectSearchDto) {
    return await this.projectService.searchProjects(
      body.query,
      body.pagination,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/mine')
  async getMyProjects(
    @Query() query: ProjectQuery,
    @GetUser() user: IUserSession,
  ) {
    try {
      return await this.projectService.getUserProjects(user.id, query);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getId(@Param('id', ParseIntPipe) id: number) {
    const project = await this.projectService.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: IUserSession,
  ) {
    await this.projectAccess.assertProjectOwner(id, user.id);
    return this.projectService.updateProject(id, updateProjectDto);
  }
}
