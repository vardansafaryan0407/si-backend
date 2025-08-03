import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { ProjectPosition } from '../models/project-position';
import { Country } from 'src/core/models/country';
import { Role } from 'src/core/models/role';
import { Skill } from 'src/core/models/skill';
import { ProjectPositionApplication } from '../models/project-position-application';
import { Equity } from '../models/equity';

@Injectable()
export class ProjectPositionRepository extends BaseRepository<ProjectPosition> {
  constructor(@InjectModel(ProjectPosition) model: typeof ProjectPosition) {
    super(model);
  }

  async findByProject(projectId: number): Promise<ProjectPosition[]> {
    return this.model.findAll({
      where: {
        project_id: projectId,
      },
      include: ['country', 'role', 'skills', 'applications'],
    });
  }

  async findById(id: number): Promise<ProjectPosition> {
    return this.model.findByPk(id, {
      include: [
        { model: Country },
        { model: Role },
        {
          model: Skill,
          through: { attributes: [] },
        },
        { model: ProjectPositionApplication },
        { model: Equity },
      ],
    });
  }
}
