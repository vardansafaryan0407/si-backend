import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectService } from './services/project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './project';
import { ProjectMember } from './models/project-member';
import { Equity } from './models/equity';
import { ProjectPosition } from './models/project-position';
import { ProjectPositionApplication } from './models/project-position-application';

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
  providers: [ProjectRepository, ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
