import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectService } from './services/project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './project';
import { ProjectMember } from './models/project-member';
import { Equity } from './models/equity';
import { ProjectMemberApplication } from './models/project-member-application';
import { ProjectMemberApplicationService } from './services/project-member-application.service';
import { ProjectMemberApplicationRepository } from './repositories/project-member-application.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Project,
      ProjectMember,
      Equity,
      ProjectMemberApplication,
    ]),
  ],
  providers: [
    ProjectRepository,
    ProjectService,
    ProjectMemberApplicationService,
    ProjectMemberApplicationRepository,
  ],
  controllers: [ProjectController],
})
export class ProjectModule {}
