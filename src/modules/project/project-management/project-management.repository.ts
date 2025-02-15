import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { ProjectManagement } from './project-management';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProjectManagementRepository extends BaseRepository<ProjectManagement> {
  constructor(
    @InjectModel(ProjectManagement)
    model: typeof ProjectManagement,
  ) {
    super(model);
  }
}
