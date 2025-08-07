import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionRepository } from './project-position.repository';
import { CreateProjectPositionDto } from '../dto/create-project-position.dto';
import { UpdateProjectPositionDto } from '../dto/update-project-position.dto';
import { ProjectPositionApplication } from '../models/project-position-application';
import { Project } from '../project';

@Injectable()
export class ProjectPositionService extends BaseService<ProjectPosition> {
  constructor(protected readonly repository: ProjectPositionRepository) {
    super(repository);
  }

  async create(data: CreateProjectPositionDto) {
    const position = await this.repository.create(data);

    if (data.skills && data.skills.length > 0) {
      await position.addSkills(data.skills);
    }

    return position;
  }

  async getApplicationsByOwner(
    userId: number,
  ): Promise<ProjectPositionApplication[]> {
    return await ProjectPositionApplication.findAll({
      include: [
        {
          model: ProjectPosition,
          include: [
            {
              model: Project,
              where: { owner_id: userId },
            },
          ],
        },
        'user',
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findByProject(projectId: number) {
    return this.repository.findByProject(projectId);
  }

  async findById(id: number) {
    return this.repository.findById(id);
  }

  async deletePosition(id: number) {
    return this.repository.delete(id);
  }

  async updatePosition(
    id: number,
    updateData: UpdateProjectPositionDto,
  ): Promise<ProjectPosition> {
    const position = await this.repository.findById(id);
    if (!position) {
      throw new NotFoundException(`ProjectPosition with id ${id} not found`);
    }

    await position.update(updateData as any);
    return position;
  }
}
