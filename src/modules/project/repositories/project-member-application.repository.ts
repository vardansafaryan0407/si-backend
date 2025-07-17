import { BaseRepository } from '../../../core/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectMemberApplication } from '../models/project-member-application';
import { ProjectMember } from '../models/project-member';
import { Project } from '../project';
import { User } from 'src/modules/user/user';
import { Country } from 'src/core/models/country';
import { Role } from 'src/core/models/role';
import { Equity } from '../models/equity';
import { Skill } from 'src/core/models/skill';

@Injectable()
export class ProjectMemberApplicationRepository extends BaseRepository<ProjectMemberApplication> {
  constructor(
    @InjectModel(ProjectMemberApplication)
    model: typeof ProjectMemberApplication,
  ) {
    super(model);
  }

  async getApplicationsByOwner(
    ownerId: number,
  ): Promise<ProjectMemberApplication[]> {
    return this.model.findAll({
      include: [
        {
          model: ProjectMember,
          required: true,
          include: [
            {
              model: Project,
              required: true,
              where: { owner_id: ownerId },
            },
            {
              model: Role,
              required: true,
            },
            {
              model: Equity,
              as: 'equity',
              required: false,
            },
            {
              model: Skill,
              through: { attributes: [] },
              required: false,
            },
          ],
        },
        {
          model: User,
          required: true,
          include: [
            {
              model: Country,
            },
          ],
        },
      ],
    });
  }

  async findById(id: number) {
    return this.model.findOne({
      where: { id },
      include: [
        {
          model: ProjectMember,
          include: [
            {
              model: Project,
            },
          ],
        },
        {
          model: User,
          include: [
            {
              model: Country,
            },
          ],
        },
      ],
    });
  }

  async findApprovedByProjectId(
    projectId: number,
  ): Promise<ProjectMemberApplication[]> {
    return this.model.findAll({
      where: { status: 'approved' },
      include: [
        {
          model: ProjectMember,
          required: true,
          where: { projectId },
          include: [
            {
              model: Role,
              required: true,
            },
            {
              model: Equity,
              as: 'equity',
              required: false,
            },
          ],
        },
        {
          model: User,
          required: true,
        },
      ],
    });
  }
}
