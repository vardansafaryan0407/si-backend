import { Injectable } from '@nestjs/common';
import { ProjectMembers } from 'src/core/models/project.members';
import { BaseService } from 'src/core/services/base.service';
import { ProjectMembersRepository } from './project-members.repository';

@Injectable()
export class ProjectMembersService extends BaseService<ProjectMembers> {

    constructor(repository : ProjectMembersRepository){
        super(repository)
    }
}
