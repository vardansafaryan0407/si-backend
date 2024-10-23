import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skills } from 'src/core/models/skills';
import { SkillsController } from './skills.controller';
import { SkillsRepository } from './skills.repository';

@Module({
  imports : [SequelizeModule.forFeature([Skills])],
  providers: [SkillsService,SkillsRepository],
  exports : [SkillsService,SkillsRepository],
  controllers : [SkillsController]
})
export class SkillsModule {}
