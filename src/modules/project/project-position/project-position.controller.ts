import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { CreateProjectPositionDto } from '../dto/create-project-position.dto';
import { CreateProjectPositionApplicationDto } from '../dto/create-project-position-application.dto';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { IUserSession } from 'src/core/interfaces/user-session';
import { ProjectPositionService } from './project-position.service';
import { ProjectPositionApplicationService } from '../services/project-position-application.service';

@Controller('project-position')
export class ProjectPositionController {
  constructor(
    private projectPositionService: ProjectPositionService,
    private projectPositionApplicationService: ProjectPositionApplicationService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createPosition(
    @Body() createPositionData: CreateProjectPositionDto,
    @GetUser() user: IUserSession,
  ) {
    return await this.projectPositionService.create({
      ...createPositionData,
      project_id: createPositionData.project_id,
    });
  }

  @UseGuards(AuthGuard)
  @Get('applications')
  async getApplicationss(@GetUser() user: IUserSession) {
    return this.projectPositionService.getApplicationsByOwner(user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/project/:projectId')
  async getPositionsByProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectPositionService.findByProject(projectId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getApplicationsByPositionId(@Param('id', ParseIntPipe) id: number) {
    return this.projectPositionApplicationService.getApplicationById(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePosition(@Param('id', ParseIntPipe) id: number) {
    return this.projectPositionService.deletePosition(id);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/apply')
  async applyToPosition(
    @Param('id', ParseIntPipe) positionId: number,
    @Body() applicationData: CreateProjectPositionApplicationDto,
    @GetUser() user: IUserSession,
  ) {
    return this.projectPositionApplicationService.createApplication(
      applicationData,
      positionId,
      user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/:id/applications')
  async getApplications(@Param('id', ParseIntPipe) positionId: number) {
    return this.projectPositionApplicationService.getApplicationsByPosition(
      positionId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('/applications/:id/approve')
  async approveApplication(@Param('id', ParseIntPipe) applicationId: number) {
    return this.projectPositionApplicationService.approveApplication(
      applicationId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('/applications/:id/reject')
  async rejectApplication(@Param('id', ParseIntPipe) applicationId: number) {
    return this.projectPositionApplicationService.rejectApplication(
      applicationId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/applications/my')
  async getMyApplications(@GetUser() user: IUserSession) {
    return this.projectPositionApplicationService.getUserApplications(user.id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: 'approved' | 'rejected',
  ) {
    return this.projectPositionApplicationService.updateStatus(id, status);
  }

  @Get('approved-members/:projectId')
  async getApprovedMembers(@Param('projectId') projectId: number) {
    return this.projectPositionApplicationService.getApprovedMembersByProject(
      +projectId,
    );
  }
}
