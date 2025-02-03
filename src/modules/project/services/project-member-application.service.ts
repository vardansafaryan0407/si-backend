import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../core/services/base.service';
import { ProjectMemberApplication } from '../models/project-member-application';
import { ProjectMemberApplicationRepository } from '../repositories/project-member-application.repository';
import { ProjectApplyDto } from '../dto/project-apply.dto';
import { EmailService } from '../../../email/email.service';

@Injectable()
export class ProjectMemberApplicationService extends BaseService<ProjectMemberApplication> {
  constructor(
    protected readonly repository: ProjectMemberApplicationRepository,
  ) {
    super(repository);
  }

  async projectApply(
    memberId: number,
    userId: number,
    projectApplyData: ProjectApplyDto,
  ) {
    return await this.repository.create({
      member_id: memberId,
      user_id: userId,
      ...projectApplyData,
    });
  }
}
