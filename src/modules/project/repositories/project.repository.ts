import { BaseRepository } from '../../../core/repositories/base.repository';
import { Project } from '../project';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectMember } from '../models/project-member';
import { Equity } from '../models/equity';
import { Skill } from 'src/core/models/skill';
import { Role } from 'src/core/models/role';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(@InjectModel(Project) model: typeof Project) {
    super(model);
  }

  public async createProject(createProjectData) {
    return await this.model.create(createProjectData, {
      include: {
        model: ProjectMember,
        include: [Equity],
      },
    });
  }

  public async findById(id: number): Promise<Project> {
    return this.model.findByPk(id, {
      include: [
        {
          model: ProjectMember,
          as: 'members',
          include: [
            { model: Skill, through: { attributes: [] } },
            { model: Role },
            { model: Equity },
          ],
        },
      ],
    });
  }
}
