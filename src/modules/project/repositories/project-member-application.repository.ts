import { BaseRepository } from '../../../core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectMemberApplication } from '../models/project-member-application';
import { ProjectMember } from '../models/project-member';
import { Project } from '../project';
import { User } from 'src/modules/user/user';

@Injectable()
export class ProjectMemberApplicationRepository extends BaseRepository<ProjectMemberApplication> {
  constructor(
    @InjectModel(ProjectMemberApplication)
    model: typeof ProjectMemberApplication,
  ) {
    super(model);
  }

  async getApplicationsByOwner(
    ownerId: number,
  ): Promise<ProjectMemberApplication[]> {
    return this.model.findAll({
      include: [
        {
          model: ProjectMember,
          required: true,
          include: [
            {
              model: Project,
              required: true,
              where: { owner_id: ownerId },
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
