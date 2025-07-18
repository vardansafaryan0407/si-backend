import { Module } from '@nestjs/common';
import { ProjectMemberController } from './project-member.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectMember } from '../models/project-member';
import { ProjectModule } from '../project.module';
import { ProjectMemberService } from './project-member.service';
import { ProjectMemberRepository } from './project-member.repository';
import { EmailModule } from '../../../core/email/email.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProjectMember]),
    ProjectModule,
    EmailModule,
  ],
  providers: [
    ProjectMemberRepository,
    ProjectMemberService,
  ],
  controllers: [ProjectMemberController],
  exports: [ProjectMemberService],
})
export class ProjectMemberModule {}
