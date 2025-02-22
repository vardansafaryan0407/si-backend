import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { ProjectMember } from '../models/project-member';
import { ProjectMemberRepository } from './project-member.repository';

@Injectable()
export class ProjectMemberService extends BaseService<ProjectMember> {
  constructor(protected readonly repository: ProjectMemberRepository) {
    super(repository);
  }

  public findById(id: number) {
    return this.repository.findById(id);
  }
}
