import { Module } from '@nestjs/common';
import { UsersSkillsService } from './users-skills.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSkills } from 'src/core/models/user.skills';
import { UsersSkillsController } from './users-skills.controller';
import { UserSkillsRepository } from './users-skills.repository';

@Module({
  imports : [SequelizeModule.forFeature([UserSkills])],
  exports : [UsersSkillsService,UserSkillsRepository],
  providers: [UsersSkillsService,UserSkillsRepository],
  controllers : [UsersSkillsController]
})
export class UsersSkillsModule {}
