import { Module } from '@nestjs/common';
import { ProjectMemberController } from './project-member.controller';
import { ProjectMemberApplicationService } from '../services/project-member-application.service';
import { ProjectMemberApplication } from '../models/project-member-application';
import { ProjectMemberApplicationRepository } from '../repositories/project-member-application.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectMember } from '../models/project-member';
import { ProjectModule } from '../project.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    SequelizeModule.forFeature([ProjectMember, ProjectMemberApplication]),
    ProjectMemberApplication,
    ProjectModule,
  ],
  providers: [
    ProjectMemberApplicationService,
    ProjectMemberApplicationRepository,
    EmailService,
  ],
  controllers: [ProjectMemberController],
  exports: [ProjectMemberApplicationService, EmailService],
})
export class ProjectMemberModule {}
