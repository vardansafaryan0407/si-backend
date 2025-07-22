import { BaseRepository } from '../../../core/repositories/base.repository';
import { Project } from '../project';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectMember } from '../models/project-member';
import { Equity } from '../models/equity';
import { Skill } from 'src/core/models/skill';
import { Role } from 'src/core/models/role';
import { User } from '../../user/user';
import { ProjectPosition } from '../models/project-position';
import { Country } from 'src/core/models/country';
import { ProjectPositionApplication } from '../models/project-position-application';

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(@InjectModel(Project) model: typeof Project) {
    super(model);
  }

  public async createProject(createProjectData) {
    return await this.model.create(createProjectData, {
      include: {
        model: ProjectPosition,
        include: [Equity],  
      },
 
    });
  }

public async findById(id: number): Promise<Project> {
  return this.model.findByPk(id, {
    include: [
      { model: User },
      {
        model: ProjectPosition,
        as: 'positions',
        include: [
          { model: Country, as: 'country_id' },
          { model: Role, as: 'role' },
          { model: Skill, through: { attributes: [] } },
          { model: Equity, as: 'equity' },
          { model: ProjectPositionApplication, as: 'applications' },
        ],
      },
    ],
  });
}
}