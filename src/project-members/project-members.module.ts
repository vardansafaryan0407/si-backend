import { Module } from '@nestjs/common';
import { ProjectMembersService } from './project-members.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectMember } from 'src/project/models/project-member';
import { ProjectMembersController } from './project-members.controller';
import { ProjectMembersRepository } from './project-members.repository';

@Module({
  imports : [SequelizeModule.forFeature([ProjectMember])],
  providers: [ProjectMembersService,ProjectMembersRepository],
  exports : [ProjectMembersService,ProjectMembersRepository],
  controllers : [ProjectMembersController]
})
export class ProjectMembersModule {}
