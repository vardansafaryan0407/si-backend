import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProjectRepository } from './repositories/project.repository';
import { ProjectService } from './services/project.service';
import { ProjectController } from './project.controller';

import { Project } from './project';
import { ProjectMember } from './models/project-member';
import { Equity } from './models/equity';
import { ProjectPosition } from './models/project-position';
import { ProjectPositionApplication } from './models/project-position-application';
import { ProjectPositionRepository } from './project-position/project-position.repository';
import { ProjectPositionService } from './project-position/project-position.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Project,
      ProjectMember,
      Equity,
      ProjectPosition,
      ProjectPositionApplication,
    ]),
  ],
  providers: [
    ProjectRepository,
    ProjectService,
    ProjectPositionRepository,
    ProjectPositionService,
  ],
  controllers: [ProjectController],
  exports: [ProjectService, ProjectPositionService],
})
export class ProjectModule {}
