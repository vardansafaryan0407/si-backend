import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { ProjectMemberApplication } from '../models/project-member-application';
import { ProjectMemberApplicationRepository } from '../repositories/project-member-application.repository';
import { ProjectApplyDto } from '../dto/project-apply.dto';
import { ProjectService } from './project.service';
import { EmailService } from 'src/core/email/email.service';
import { ProjectMemberService } from '../project-member/project-member.service';

@Injectable()
export class ProjectMemberApplicationService extends BaseService<ProjectMemberApplication> {
  constructor(
    protected readonly repository: ProjectMemberApplicationRepository,
    private readonly projectService: ProjectService,
    private readonly emailService: EmailService,
    private readonly projectMemberService: ProjectMemberService,
  ) {
    super(repository);
  }

  async projectApply(
    memberId: number,
    userId: number,
    projectApplyData: ProjectApplyDto,
  ) {
    const member = await this.projectMemberService.findById(memberId);

    const project = await this.projectService.findById(member.projectId);
    if (project?.owner_id === userId) {
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
