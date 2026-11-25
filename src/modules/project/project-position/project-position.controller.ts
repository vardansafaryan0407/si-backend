import {
  BadRequestException,
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
import { ProjectAccessService } from '../services/project-access.service';

// Every route here needs a signed-in user. Routes that change a position or decide on an
// application are for the owner of the project; an application can also be read by the
// person who sent it.
@Controller('project-position')
export class ProjectPositionController {
  constructor(
    private projectPositionService: ProjectPositionService,
    private projectPositionApplicationService: ProjectPositionApplicationService,
    private projectAccess: ProjectAccessService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createPosition(
    @Body() createPositionData: CreateProjectPositionDto,
    @GetUser() user: IUserSession,
  ) {
    const projectId = Number(createPositionData.project_id);
    if (!Number.isInteger(projectId) || projectId < 1) {
      throw new BadRequestException('project_id is required');
    }
    await this.projectAccess.assertProjectOwner(projectId, user.id);
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
    @GetUser() user: IUserSession,
  ) {
    await this.projectAccess.assertProjectOwner(projectId, user.id);
    return this.projectPositionService.findByProject(projectId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getApplicationsByPositionId(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: IUserSession,
  ) {
    await this.projectAccess.assertApplicationParty(id, user.id);
    return this.projectPositionApplicationService.getApplicationById(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePosition(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: IUserSession,
  ) {
    await this.projectAccess.assertPositionOwner(id, user.id);
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
  async getApplications(
    @Param('id', ParseIntPipe) positionId: number,
    @GetUser() user: IUserSession,
  ) {
    await this.projectAccess.assertPositionOwner(positionId, user.id);
    return this.projectPositionApplicationService.getApplicationsByPosition(
      positionId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('/applications/:id/approve')
  async approveApplication(
    @Param('id', ParseIntPipe) applicationId: number,
    @GetUser() user: IUserSession,
  ) {
    await this.projectAccess.assertApplicationOwner(applicationId, user.id);
    return this.projectPositionApplicationService.approveApplication(
      applicationId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('/applications/:id/reject')
  async rejectApplication(
    @Param('id', ParseIntPipe) applicationId: number,
    @GetUser() user: IUserSession,
  ) {
    await this.projectAccess.assertApplicationOwner(applicationId, user.id);
    return this.projectPositionApplicationService.rejectApplication(
      applicationId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/applications/my')
  async getMyApplications(@GetUser() user: IUserSession) {
    return this.projectPositionApplicationService.getUserApplications(user.id);
  }

  // The id is an application id: this is how the owner approves or rejects one.
  @UseGuards(AuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: 'approved' | 'rejected',
    @GetUser() user: IUserSession,
  ) {
    if (status !== 'approved' && status !== 'rejected') {
      throw new BadRequestException('status must be approved or rejected');
    }
    await this.projectAccess.assertApplicationOwner(id, user.id);
    return this.projectPositionApplicationService.updateStatus(id, status);
  }

  @UseGuards(AuthGuard)
  @Get('approved-members/:projectId')
  async getApprovedMembers(
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectPositionApplicationService.getApprovedMembersByProject(
      projectId,
    );
  }
}
