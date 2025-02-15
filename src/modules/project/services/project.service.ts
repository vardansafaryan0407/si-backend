import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Project } from '../project';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectQuery } from '../dto/project-query.dto';
import { Op } from 'sequelize';
import { Role } from '../../../core/models/role';
import { ProjectMember } from '../models/project-member';
import { Pagination } from '../../../core/models/pagination';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Equity } from '../models/equity';
import { Skill } from '../../../core/models/skill';
import { Sequelize } from 'sequelize-typescript';
import { IBaseSearchParams } from '../../../core/interfaces/base-search-params';
import { IPaginationParams } from '../../../core/interfaces/pagination';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    protected readonly repository: ProjectRepository,
    private sequelize: Sequelize,
  ) {
    super(repository);
  }

  public async createProject(data: CreateProjectDto, user_id: number) {
    const projectCreationData = {
      ...data,
      owner_id: user_id,
    };

    await this.sequelize.transaction(async () => {
      const project = await this.repository.createProject(projectCreationData);
      for (let i = 0; i < project.members.length; i++) {
        const projectMember = project.members[i];
        await projectMember.addSkills(data.members[i].skills);
      }
    });
  }

  public findById(id: number) {
    return this.repository.findById(id);
  }

  getUserProjects(userId: number, pagination: IPaginationParams) {
    const findOptions: IBaseSearchParams = {
      where: {
        owner_id: userId,
      },
      pagination,
    };
    return this.repository.list(findOptions);
  }

  public async searchProjects(
    searchQuery: ProjectQuery,
    pagination: Pagination,
  ) {
    const { query, industryId, locationId, equity, roleId } = searchQuery;

    if (industryId) {
    }
    const where = {};

    if (query) {
      where['$or'] = [{ name: { [Op.iLike]: `%${query}%` } }];
    }

    const includes = [];

    const joinMembers: any = {
      model: ProjectMember,
      include: [
        {
          model: Skill,
          through: {
            attributes: [],
          },
        },
        {
          model: Role,
        },
        {
          model: Equity,
        },
      ],
    };
    if (roleId) {
      joinMembers.where = { role: roleId };
    }
    includes.push(joinMembers);

    const findOptions: IBaseSearchParams = {
      where,
      include: includes,
      pagination,
    };
    return this.repository.list(findOptions);
  }
}
