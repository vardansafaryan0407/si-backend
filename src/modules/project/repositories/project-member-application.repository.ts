import { BaseRepository } from '../../../core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectMemberApplication } from '../models/project-member-application';

@Injectable()
export class ProjectMemberApplicationRepository extends BaseRepository<ProjectMemberApplication> {
  constructor(
    @InjectModel(ProjectMemberApplication)
    model: typeof ProjectMemberApplication,
  ) {
    super(model);
  }
}
