import { BaseRepository } from '../../../core/repositories/base.repository';
import { Project } from '../project';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Equity } from '../models/equity';
import { Skill } from 'src/core/models/skill';

import { ProjectPosition } from '../models/project-position';
import { Includeable, Op, Order, WhereOptions } from 'sequelize';
import { Role } from '../../../core/models/role';
import { Country } from '../../../core/models/country';
import { IPaginationParams } from '../../../core/interfaces/pagination';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from '../../../core/constants/app.constants';

export interface PositionFilters {
  roles: number[];
  skills: number[];
  equity: { min?: number; max?: number };
}

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
  constructor(@InjectModel(Project) model: typeof Project) {
    super(model);
  }

  public async createProject(createProjectData) {
    return await this.model.create(createProjectData, {
      include: [
        {
          model: ProjectPosition,
          include: [
            {
              model: Equity,
            },
          ],
        },
      ],
    });
  }

  /** Ids of the projects that have at least one position matching every given filter. */
  public async findIdsByPositionFilters(
    filters: PositionFilters,
  ): Promise<number[]> {
    const include: Includeable[] = [];

    if (filters.skills.length) {
      include.push({
        model: Skill,
        attributes: [],
        through: { attributes: [] },
        where: { id: { [Op.in]: filters.skills } },
        required: true,
      });
    }

    const { min, max } = filters.equity;
    if (min || max) {
      // The range a position offers has to overlap the range that was asked for.
      include.push({
        model: Equity,
        attributes: [],
        where: {
          ...(min ? { max: { [Op.gte]: min } } : {}),
          ...(max ? { min: { [Op.lte]: max } } : {}),
        },
        required: true,
      });
    }

    const rows = await ProjectPosition.findAll({
      attributes: ['project_id'],
      where: {
        project_id: { [Op.ne]: null },
        ...(filters.roles.length
          ? { role_id: { [Op.in]: filters.roles } }
          : {}),
      },
      include,
      group: ['ProjectPosition.project_id'],
      raw: true,
    });

    return rows.map((row) => row.project_id);
  }

  /** One page of projects, newest first, each with all of its positions. */
  public async findPage(
    where: WhereOptions,
    pagination: IPaginationParams = {},
  ): Promise<Project[]> {
    const limit = +(pagination.limit || DEFAULT_LIMIT);
    const offset = +(pagination.page || DEFAULT_PAGE) * limit;
    const order: Order = [
      ['createdAt', 'DESC'],
      ['id', 'DESC'],
    ];

    // The page is cut on projects alone: with the positions joined in, LIMIT would count
    // joined rows instead of projects.
    const page = await this.model.findAll({
      attributes: ['id'],
      where,
      order,
      limit,
      offset,
    });
    if (!page.length) {
      return [];
    }

    return this.model.findAll({
      where: { id: { [Op.in]: page.map((project) => project.id) } },
      include: [
        {
          model: ProjectPosition,
          include: [
            { model: Skill, through: { attributes: [] } },
            { model: Role },
            { model: Country },
            { model: Equity },
          ],
        },
      ],
      order,
    });
  }

  public async findById(id: number): Promise<Project> {
    const project = await this.model.findByPk(id, {
      include: [
        {
          model: ProjectPosition,
          as: 'positions',
          include: [
            { model: Equity },
            { model: Skill, attributes: ['id'], through: { attributes: [] } },
          ],
        },
      ],
    });

    return project;
  }
}
