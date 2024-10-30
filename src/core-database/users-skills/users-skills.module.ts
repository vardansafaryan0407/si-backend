import { Module } from '@nestjs/common';
import { UsersSkillsService } from './users-skills.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSkill } from 'src/core/models/user-skills';
import { UsersSkillsController } from './users-skills.controller';
import { UserSkillsRepository } from './users-skills.repository';

@Module({
  imports : [SequelizeModule.forFeature([UserSkill])],
  exports : [UsersSkillsService,UserSkillsRepository],
  providers: [UsersSkillsService,UserSkillsRepository],
  controllers : [UsersSkillsController]
})
export class UsersSkillsModule {}
