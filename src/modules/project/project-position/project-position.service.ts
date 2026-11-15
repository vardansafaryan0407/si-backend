import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionRepository } from './project-position.repository';
import { CreateProjectPositionDto } from '../dto/create-project-position.dto';
import { UpdateProjectPositionDto } from '../dto/update-project-position.dto';
import { ProjectPositionApplication } from '../models/project-position-application';
import { Project } from '../project';
import { Equity } from '../models/equity';

@Injectable()
export class ProjectPositionService extends BaseService<ProjectPosition> {
  constructor(protected readonly repository: ProjectPositionRepository) {
    super(repository);
  }

  async create(data: CreateProjectPositionDto) {
    const position = await this.repository.create({
      role_id: data.role_id,
      country: data.country,
      project_id: data.project_id,
      description: data.description,
    });

    if (data.equity) {
      await position.$create('equity', {
        min: data.equity.min,
        max: data.equity.max,
      });
    }

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
          required: true,
          include: [
            {
              model: Project,
              where: { owner_id: userId },
              required: true,
            },
          ],
        },
        {
          association: 'user',
          required: true,
        },
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
    const position = await this.findById(id);

    if (!position) {
      throw new NotFoundException(`ProjectPosition with id ${id} not found`);
    }

    await position.update({
      project_id: updateData.project_id,
      role_id: updateData.role_id,
      country: updateData.country,
      description: updateData.description,
    });

    if (updateData.equity) {
      if (position.equity) {
        await position.equity.update({
          min: updateData.equity.min,
          max: updateData.equity.max,
        });
      } else {
        const newEquity = await Equity.create({
          min: updateData.equity.min,
          max: updateData.equity.max,
          project_position_id: position.id,
        });
        await position.$set('equity', newEquity);
      }
    }

    if (updateData.skills && updateData.skills.length > 0) {
      await position.$set('skills', updateData.skills);
    }

    return this.findById(id);
  }
}
