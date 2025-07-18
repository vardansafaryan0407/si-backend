import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProjectPositionApplication } from '../models/project-position-application';
import { ProjectMember } from '../models/project-member';
import { ProjectPosition } from '../models/project-position';
import { CreateProjectPositionApplicationDto } from '../dto/create-project-position-application.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProjectPositionApplicationService {
  constructor(private sequelize: Sequelize) {}

  async createApplication(
    applicationData: CreateProjectPositionApplicationDto,
    user_id: number,
  ): Promise<ProjectPositionApplication> {
    const position = await ProjectPosition.findByPk(applicationData.position_id);
    if (!position) {
      throw new NotFoundException('Position not found');
    }


    const existingApplication = await ProjectPositionApplication.findOne({
      where: {
        user_id,
        position_id: applicationData.position_id,
      },
    });

    if (existingApplication) {
      throw new BadRequestException('You have already applied for this position');
    }

    return await ProjectPositionApplication.create({
      ...applicationData,
      user_id,
      status: 'pending',
    });
  }

  async approveApplication(applicationId: number): Promise<ProjectMember> {
    return await this.sequelize.transaction(async () => {
      const application = await ProjectPositionApplication.findByPk(applicationId, {
        include: [
          {
            model: ProjectPosition,
            include: ['country', 'role', 'skills'],
          },
        ],
      });

      if (!application) {
        throw new NotFoundException('Application not found');
      }

      if (application.status !== 'pending') {
        throw new BadRequestException('Application is not pending');
      }

      await application.update({ status: 'approved' });

      const position = application.project_position;

      const projectMember = await ProjectMember.create({
        user_id: application.user_id,
        project_id: position.project_id,
        position_id: position.id,
        application_id: application.id,
        country_id: position.country_id,
        role_id: position.role_id,
        equity: application.equity || position.equity_percentage,
        application_message: application.message,
        status: 'active',
      });

      if (position.skills && position.skills.length > 0) {
        await projectMember.addSkills(position.skills.map(skill => skill.id));
      }


      return projectMember;
    });
  }

  async rejectApplication(applicationId: number): Promise<ProjectPositionApplication> {
    const application = await ProjectPositionApplication.findByPk(applicationId);
    
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.status !== 'pending') {
      throw new BadRequestException('Application is not pending');
    }

    await application.update({ status: 'rejected' });
    return application;
  }

  async getApplicationsByPosition(positionId: number): Promise<ProjectPositionApplication[]> {
    return await ProjectPositionApplication.findAll({
      where: { position_id: positionId },
      include: ['user'],
      order: [['createdAt', 'DESC']],
    });
  }

  async getUserApplications(userId: number): Promise<ProjectPositionApplication[]> {
    return await ProjectPositionApplication.findAll({
      where: { user_id: userId },
      include: ['project_position'],
      order: [['createdAt', 'DESC']],
    });
  }
}
