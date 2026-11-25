import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { Project } from '../project';
import { ProjectRepository } from '../repositories/project.repository';
import { Role } from '../../../core/models/role';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Sequelize } from 'sequelize-typescript';
import { IBaseSearchParams } from '../../../core/interfaces/base-search-params';
import { IPaginationParams } from '../../../core/interfaces/pagination';
import { UpdateProjectDto } from '../dto/project-update.dto';
import { IProjectQueryInterface } from 'si-shared-library';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionService } from '../project-position/project-position.service';
import { Op, WhereOptions } from 'sequelize';

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

    await project.update({
      title: updateProjectDto.title,
      description: updateProjectDto.description,
      country: updateProjectDto.country,
      industries: updateProjectDto.industries,
    } as any);

    // Only this project's own positions may be edited through it, and they stay in it.
    const ownPositionIds = new Set(
      (project.positions ?? []).map((position) => position.id),
    );

    for (const position of updateProjectDto.positions) {
      if (position.id) {
        if (!ownPositionIds.has(Number(position.id))) {
          throw new ForbiddenException(
            `Position ${position.id} does not belong to this project`,
          );
        }
        await this.projectPositionService.updatePosition(position.id, {
          ...position,
          project_id: id,
        });
      } else {
        await this.projectPositionService.create({
          ...position,
          project_id: id,
        });
      }
    }
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

  async getUserProjectsWithPositions(
    userId: number,
    pagination: IPaginationParams,
  ) {
    const findOptions: IBaseSearchParams = {
      where: {
        owner_id: userId,
      },
      include: [
        {
          model: ProjectPosition,
          include: [{ model: Role }],
        },
      ],
      pagination,
    };

    return this.repository.list(findOptions);
  }

  /**
   * Projects for the search page, newest first. Project filters (text, country,
   * industry) apply to the project itself; position filters (role, skills, equity)
   * keep the projects that have at least one position matching all of them.
   */
  public async searchProjects(
    searchQuery: IProjectQueryInterface = {},
    pagination: IPaginationParams = {},
  ) {
    // The form sends null for a filter that was cleared, so defaults cover null as well.
    const query = searchQuery.query ?? '';
    const industries = searchQuery.industries ?? [];
    const locations = searchQuery.locations ?? [];
    const roles = searchQuery.roles ?? [];
    const skills = searchQuery.skills ?? [];
    const equity = searchQuery.equity ?? {};

    const where: { [key: string | symbol]: unknown } = {};

    if (query) {
      // LIKE wildcards typed by the visitor are matched literally.
      const pattern = `%${query.replace(/[\\%_]/g, '\\$&')}%`;
      where[Op.or] = [
        { title: { [Op.like]: pattern } },
        { description: { [Op.like]: pattern } },
      ];
    }
    if (locations.length) {
      where['country'] = { [Op.in]: locations };
    }
    if (industries.length) {
      where['industries'] = { [Op.in]: industries };
    }

    if (roles.length || skills.length || equity.min || equity.max) {
      const projectIds = await this.repository.findIdsByPositionFilters({
        roles,
        skills,
        equity,
      });
      if (!projectIds.length) {
        return [];
      }
      where['id'] = { [Op.in]: projectIds };
    }

    return this.repository.findPage(where as WhereOptions, pagination);
  }
}
