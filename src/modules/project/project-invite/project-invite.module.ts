import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectInvite } from '../models/project-invite';
import { ProjectInviteController } from './project-invite.controller';
import { ProjectInviteService } from './project-invite.service';
import { ProjectInviteRepository } from './project-invite.repository';
import { User } from 'src/modules/user/user';
import { ProjectPosition } from '../models/project-position';

@Module({
  imports: [SequelizeModule.forFeature([ProjectInvite, User, ProjectPosition])],
  providers: [ProjectInviteService, ProjectInviteRepository],
  controllers: [ProjectInviteController],
  exports: [ProjectInviteService, ProjectInviteRepository],
})
export class ProjectInviteModule {}
