import { Module } from '@nestjs/common';
import { ProjectManagmentService } from './project-management.service';
import { ProjectManagementRepository } from './project-management.repository';
import { ProjectManagementController } from './project-management-controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectManagement } from './project-management';

@Module({
  imports: [SequelizeModule.forFeature([ProjectManagement])],
  controllers: [ProjectManagementController],
  providers: [ProjectManagmentService, ProjectManagementRepository],
})
export class ProjectManagementModule {}
