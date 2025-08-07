import { Injectable } from '@nestjs/common';
import { ProjectInvite } from '../models/project-invite';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/core/repositories/base.repository';

@Injectable()
export class ProjectInviteRepository extends BaseRepository<ProjectInvite> {
  constructor(@InjectModel(ProjectInvite) model: typeof ProjectInvite) {
    super(model);
  }
}
