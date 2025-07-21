import { forwardRef, Module } from '@nestjs/common';
import { ProjectPositionController } from './project-position.controller';
import { ProjectPositionApplicationService } from '../services/project-position-application.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionApplication } from '../models/project-position-application';
import { ProjectPositionService } from './project-position.service';
import { ProjectPositionRepository } from './project-position.repository';
import { EmailModule } from '../../../core/email/email.module';
import { ProjectPositionApplicationRepository } from '../models/project-position-application.repository';
import { ProjectMemberModule } from '../project-member/project-member.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProjectPosition, ProjectPositionApplication]),
    EmailModule,
   forwardRef(() => ProjectMemberModule)
  ],
  providers: [
    ProjectPositionApplicationService,
    ProjectPositionService,
    ProjectPositionRepository,
    ProjectPositionApplicationRepository
  ],
  controllers: [ProjectPositionController],
  exports: [ProjectPositionApplicationService, ProjectPositionService,ProjectPositionApplicationRepository],
})
export class ProjectPositionModule {}
