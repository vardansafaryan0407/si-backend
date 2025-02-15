import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { ProjectManagement } from './project-management';
import { UpdateProjectDto } from '../dto/project-update.dto';
import { ProjectManagementRepository } from './project-management.repository';

@Injectable()
export class ProjectManagmentService extends BaseService<ProjectManagement> {
  constructor(protected readonly repository: ProjectManagementRepository) {
    super(repository);
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.repository.findById(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }

    await project.update(updateProjectDto);
    return project;
  }
}
