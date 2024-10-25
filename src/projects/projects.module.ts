import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Projects } from 'src/core/models/projects';
import { ProjectsRepository } from './projects.repository';
import { ProjectsController } from './projects.controller';

@Module({
  imports :[SequelizeModule.forFeature([Projects])],
  providers: [ProjectsService,ProjectsRepository],
  exports :[ProjectsService,ProjectsRepository],
  controllers : [ProjectsController]
})
export class ProjectsModule {}
