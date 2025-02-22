import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { ProjectMember } from '../models/project-member';

@Injectable()
export class ProjectMemberRepository extends BaseRepository<ProjectMember> {
  constructor(@InjectModel(ProjectMember) model: typeof ProjectMember) {
    super(model);
  }
}
