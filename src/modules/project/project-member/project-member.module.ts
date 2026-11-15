import { Module } from '@nestjs/common';
import { ProjectMemberController } from './project-member.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectMember } from '../models/project-member';
import { ProjectModule } from '../project.module';
import { ProjectMemberService } from './project-member.service';
import { ProjectMemberRepository } from './project-member.repository';
import { EmailModule } from '../../../core/email/email.module';
import { ProjectPositionModule } from '../project-position/project-position.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProjectMember]),
    ProjectPositionModule,
    ProjectModule,
    EmailModule,
  ],
  providers: [ProjectMemberRepository, ProjectMemberService],
  controllers: [ProjectMemberController],
  exports: [ProjectMemberService, ProjectMemberRepository],
})
export class ProjectMemberModule {}
