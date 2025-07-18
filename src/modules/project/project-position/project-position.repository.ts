import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { ProjectPosition } from '../models/project-position';

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

  async findById(id: number): Promise<ProjectPosition | null> {
    return this.model.findByPk(id, {
      include: ['country', 'role', 'skills', 'applications'],
    });
  }
}