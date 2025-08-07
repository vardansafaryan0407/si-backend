import { ProjectInvite } from '../models/project-invite';
import { ProjectInviteRepository } from './project-invite.repository';
import { CreateInvitePositionDto } from '../dto/create-project-position-application.dto';
import { BaseService } from 'src/core/services/base.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectInviteService extends BaseService<ProjectInvite> {
  constructor(protected readonly repository: ProjectInviteRepository) {
    super(repository);
  }

  async createInvite(
    data: CreateInvitePositionDto,
    user: number,
  ): Promise<ProjectInvite> {
    if (data.user_id === user) {
      throw new Error('You cannot invite yourself');
    }

    return this.repository.create({
      message: data.message,
      user_id: data.user_id,
      position_id: data.position_id,
    });
  }
}
