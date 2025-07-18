import { Module } from '@nestjs/common';
import { ProjectPositionController } from './project-position.controller';
import { ProjectPositionApplicationService } from '../services/project-position-application.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionApplication } from '../models/project-position-application';
import { ProjectPositionService } from './project-position.service';
import { ProjectPositionRepository } from './project-position.repository';
import { EmailModule } from '../../../core/email/email.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProjectPosition, ProjectPositionApplication]),
    EmailModule,
  ],
  providers: [
    ProjectPositionApplicationService,
    ProjectPositionService,
    ProjectPositionRepository,
  ],
  controllers: [ProjectPositionController],
  exports: [ProjectPositionApplicationService, ProjectPositionService],
})
export class ProjectPositionModule {}
