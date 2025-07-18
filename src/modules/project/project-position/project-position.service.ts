import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionRepository } from './project-position.repository';
import { CreateProjectPositionDto } from '../dto/create-project-position.dto';
import { UpdateProjectPositionDto } from '../dto/update-project-position.dto';

@Injectable()
export class ProjectPositionService extends BaseService<ProjectPosition> {
  constructor(protected readonly repository: ProjectPositionRepository) {
    super(repository);
  }

  async create(data: CreateProjectPositionDto & { project_id: number }) {
    const position = await this.repository.create(data);
    
    if (data.skill_ids && data.skill_ids.length > 0) {
      await position.addSkills(data.skill_ids);
    }
    
    return position;
  }

  async updatePosition(id: number, data: UpdateProjectPositionDto) {
    const position = await this.repository.findById(id);
    if (!position) {
      throw new Error('Position not found');
    }

    await position.update(data);

    if (data.skill_ids) {
      await position.addSkills(data.skill_ids);
    }

    return position;
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
}