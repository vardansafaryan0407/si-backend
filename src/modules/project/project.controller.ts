import {
  Body,
  Controller,
  Get,
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
import { Pagination } from '../../core/models/pagination';
import { GetUser } from '../../core/decorators/get-user.decorator';
import { IUserSession } from '../../core/interfaces/user-session';
import { UpdateProjectDto } from './dto/project-update.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

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
  

     @Post('/search')
  async listProjects(
    @Body() query: ProjectQuery,
    @Query() pagination: Pagination,
  ) {
    try {
      return await this.projectService.searchProjects(query, pagination);
    } catch (error) {
      console.log(error);
      return error;
    }
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
  async getId(@Param('id') id: number) {
    return await this.projectService.findById(id);
  }

  @Put('update/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, UpdateProjectDto);
  }
}
