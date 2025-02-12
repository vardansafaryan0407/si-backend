import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { ProjectMemberApplication } from '../models/project-member-application';
import { ProjectMemberApplicationRepository } from '../repositories/project-member-application.repository';
import { ProjectApplyDto } from '../dto/project-apply.dto';
import { ProjectService } from './project.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ProjectMemberApplicationService extends BaseService<ProjectMemberApplication> {
  constructor(
    protected readonly repository: ProjectMemberApplicationRepository,
    private readonly projectService: ProjectService,
    private readonly emailService: EmailService,
  ) {
    super(repository);
  }

  async projectApply(
    memberId: number,
    userId: number,
    projectApplyData: ProjectApplyDto,
  ) {
    const project = await this.projectService.findById(
      projectApplyData.projectId,
    );

    if (project?.owner.id === userId) {
      throw new Error('you cant apply');
    }

    if (project?.owner.email) {
      await this.emailService.sendMail(
        project.owner.email,
        projectApplyData.equity,
      );
    }

    const application = await this.repository.create({
      member_id: memberId,
      user_id: userId,
      ...projectApplyData,
    });

    return application;
  }
}
