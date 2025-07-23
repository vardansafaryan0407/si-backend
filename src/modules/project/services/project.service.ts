import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Project } from '../project';
import { ProjectRepository } from '../repositories/project.repository';
import { Op } from 'sequelize';
import { Role } from '../../../core/models/role';
import { Pagination } from '../../../core/models/pagination';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Equity } from '../models/equity';
import { Skill } from '../../../core/models/skill';
import { Sequelize } from 'sequelize-typescript';
import { IBaseSearchParams } from '../../../core/interfaces/base-search-params';
import { IPaginationParams } from '../../../core/interfaces/pagination';
import { UpdateProjectDto } from '../dto/project-update.dto';
import { IProjectQueryInterface } from 'si-shared-library';
import { ProjectQueryBuilder } from './project-query-builder';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionService } from '../project-position/project-position.service';
import { Country } from 'src/core/models/country';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    protected readonly repository: ProjectRepository,
    private sequelize: Sequelize,
    private projectPositionService: ProjectPositionService,
  ) {
    super(repository);
  }

  public async createProject(data: CreateProjectDto, user_id: number) {
    const projectData = {
      ...data,
      owner_id: user_id,
    };

    return await this.sequelize.transaction(async () => {
      const project = await this.repository.createProject(projectData);

      for (let i = 0; i < project.positions.length; i++) {
        const projectposition = project.positions[i];
        await projectposition.addSkills(data.positions[i].skills);
      }
    });
  }

  public findById(id: number) {
    return this.repository.findById(id);
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.repository.findById(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }

    // TODO remove any and implement correct types
    await project.update(updateProjectDto as any);
    return project;
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
    searchQuery: IProjectQueryInterface,
    pagination: Pagination,
  ) {
    const {
      query = '',
      industries = [],
      locations = [],
      equity = {},
      roles = [],
      skills = [],
    } = searchQuery;

    const where = {};

    if (query) {
      where['$or'] = [{ name: { [Op.like]: `%${query}%` } }];
    }
    if (locations.length) {
      where['country'] = { [Op.in]: locations };
    }

    if (industries.length) {
      where['industries'] = { [Op.in]: industries };
    }

    const includes = [];

    const skillsQuery = ProjectQueryBuilder.buildSkillsQuery(skills);

    const joinMembers: any = {
      model: ProjectPosition,
      required: true,
      include: [
        {
          model: Skill,
          through: {
            attributes: [],
          },
          ...skillsQuery,
          required: !!skills?.length,
        },
        {
          model: Role,
        },
        {
          model: Country,
        },

        {
          model: Equity,
          ...ProjectQueryBuilder.buildEquityQuery(equity),
          required: !!(equity?.min || equity?.max),
        },
      ],
    };

    if (roles.length) {
      joinMembers.where = {
        ...(joinMembers.where || {}),
        role_id: { [Op.in]: roles },
      };
    }
    includes.push(joinMembers);

    const findOptions: IBaseSearchParams = {
      where,
      include: includes,
      pagination,
      subQuery: false,
    };
    return this.repository.list(findOptions);
  }
}
