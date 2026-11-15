import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { ProjectPositionApplication } from './project-position-application';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectMember } from './project-member';
import { Role } from 'src/core/models/role';
import { Equity } from './equity';
import { User } from 'src/modules/user/user';

@Injectable()
export class ProjectPositionApplicationRepository extends BaseRepository<ProjectPositionApplication> {
  constructor(
    @InjectModel(ProjectPositionApplication)
    model: typeof ProjectPositionApplication,
  ) {
    super(model);
  }

  async findApprovedByProjectId(
    projectId: number,
  ): Promise<ProjectPositionApplication[]> {
    return this.model.findAll({
      where: { status: 'approved' },
      include: [
        {
          model: ProjectMember,
          required: true,
          where: { project_id: projectId },

          include: [
            {
              model: Role,
              required: true,
            },
            {
              model: Equity,
              as: 'equity',
              required: false,
            },
          ],
        },
        {
          model: User,
          required: true,
        },
      ],
    });
  }
}
