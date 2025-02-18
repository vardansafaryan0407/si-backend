import { Module } from '@nestjs/common';
import { ProjectMemberController } from './project-member.controller';
import { ProjectMemberApplicationService } from '../services/project-member-application.service';
import { ProjectMemberApplication } from '../models/project-member-application';
import { ProjectMemberApplicationRepository } from '../repositories/project-member-application.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectMember } from '../models/project-member';
import { ProjectModule } from '../project.module';
import { EmailService } from 'src/email/email.service';
import { ProjectMemberService } from './project-member.service';
import { ProjectMemberRepository } from './project-member.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([ProjectMember, ProjectMemberApplication]),
    ProjectMemberApplication,
    ProjectModule,
  ],
  providers: [
    ProjectMemberApplicationService,
    ProjectMemberApplicationRepository,
    ProjectMemberRepository,
    EmailService,
    ProjectMemberService,
  ],
  controllers: [ProjectMemberController],
  exports: [
    ProjectMemberApplicationService,
    EmailService,
    ProjectMemberService,
  ],
})
export class ProjectMemberModule {}
