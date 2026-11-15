import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ProjectPositionApplication } from '../models/project-position-application';
import { ProjectMember } from '../models/project-member';
import { CreateProjectPositionApplicationDto } from '../dto/create-project-position-application.dto';
import { ProjectMemberRepository } from '../project-member/project-member.repository';
import { ProjectPosition } from '../models/project-position';
import { ProjectPositionRepository } from '../project-position/project-position.repository';
import { ProjectPositionApplicationRepository } from '../models/project-position-application.repository';
import { Country } from 'src/core/models/country';
import { Role } from 'src/core/models/role';
import { Skill } from 'src/core/models/skill';
import { Equity } from '../models/equity';

@Injectable()
export class ProjectPositionApplicationService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly projectMemberRepository: ProjectMemberRepository,
    private readonly projectPositionRepository: ProjectPositionRepository,
    private readonly projectPositionApplicationRepository: ProjectPositionApplicationRepository,
  ) {}

  async createApplication(
    applicationData: CreateProjectPositionApplicationDto,
    position_id: number,
    user_id: number,
  ): Promise<ProjectPositionApplication> {
    const position =
      await this.projectPositionRepository.findById(+position_id);
    if (!position) {
      throw new NotFoundException('Position not found');
    }

    const existingApplication =
      await this.projectPositionApplicationRepository.findOne({
        where: {
          user_id,
          position_id,
        },
      });

    if (existingApplication) {
      throw new BadRequestException(
        'You have already applied for this position',
      );
    }

    return await this.projectPositionApplicationRepository.create({
      ...applicationData,
      position_id,
      user_id,
      status: 'pending',
    });
  }

  async updateStatus(id: number, status: 'approved' | 'rejected') {
    const application = await this.projectPositionApplicationRepository.findOne(
      {
        where: { id },
        include: [
          {
            model: ProjectPosition,
            include: [Country, Role, Skill, Equity],
          },
        ],
      },
    );

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status === status) {
      return application;
    }

    application.status = status;
    await application.save();

    if (status === 'approved') {
      const position = application.project_position;

      const existingMember = await this.projectMemberRepository.findOne({
        where: { application_id: application.id },
      });

      if (!existingMember) {
        const projectMember = await this.projectMemberRepository.create({
          user_id: application.user_id,
          project_id: position.project_id!,
          position_id: position.id,
          application_id: application.id,
          country_id: position.country_id?.id,
          role_id: position.role_id,
          equity: position.equity,
          status: 'active',
        });

        if (position.skills && position.skills.length > 0) {
          await projectMember.addSkills(
            position.skills.map((skill) => skill.id),
          );
        }
      }
    }

    return application;
  }

  async approveApplication(applicationId: number): Promise<ProjectMember> {
    return await this.sequelize.transaction(async (transaction) => {
      const application =
        await this.projectPositionApplicationRepository.findOne({
          where: { id: applicationId },
          include: [
            {
              model: ProjectPosition,
              include: [
                { model: Country },
                { model: Role },
                { model: Skill },
                { model: Equity },
              ],
            },
          ],
        });

      if (!application) {
        throw new NotFoundException('Application not found');
      }

      await application.update({ status: 'approved' }, { transaction });

      const position = application.project_position;
      if (!position) {
        throw new Error('Position not found for application');
      }

      const projectMember = await this.projectMemberRepository.create({
        user_id: application.user_id,
        project_id: position.project_id!,
        position_id: position.id,
        application_id: application.id,
        country_id: position.country_id?.id,
        role_id: position.role_id,
        equity: position.equity,
        status: 'active',
      });

      if (position.skills && position.skills.length > 0) {
        await projectMember.addSkills(
          position.skills.map((skill) => skill.id),
          { transaction },
        );
      }

      return projectMember;
    });
  }

  async getApplicationById(
    applicationId: number,
  ): Promise<ProjectPositionApplication> {
    const application = await ProjectPositionApplication.findByPk(
      applicationId,
      {
        include: ['user', 'project_position'],
      },
    );

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async rejectApplication(
    applicationId: number,
  ): Promise<ProjectPositionApplication> {
    const application =
      await ProjectPositionApplication.findByPk(applicationId);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status !== 'pending') {
      throw new BadRequestException('Application is not pending');
    }

    await application.update({ status: 'rejected' });
    return application;
  }

  async getApplicationsByPosition(
    positionId: number,
  ): Promise<ProjectPositionApplication[]> {
    return await ProjectPositionApplication.findAll({
      where: { position_id: positionId },
      include: ['user'],
      order: [['createdAt', 'DESC']],
    });
  }

  async getUserApplications(
    userId: number,
  ): Promise<ProjectPositionApplication[]> {
    return await ProjectPositionApplication.findAll({
      where: { user_id: userId },
      include: ['project_position'],
      order: [['createdAt', 'DESC']],
    });
  }

  async getApprovedMembersByProject(projectId: number) {
    return this.projectPositionApplicationRepository.findApprovedByProjectId(
      projectId,
    );
  }

  async getApplicationsByProject(
    projectId: number,
  ): Promise<ProjectPositionApplication[]> {
    return await ProjectPositionApplication.findAll({
      include: [
        {
          model: ProjectPosition,
          where: { project_id: projectId },
        },
        'user',
      ],
      order: [['createdAt', 'DESC']],
    });
  }
}
