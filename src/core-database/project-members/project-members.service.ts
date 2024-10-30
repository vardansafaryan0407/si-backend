import { Injectable } from '@nestjs/common';
import { ProjectMember } from 'src/core/models/project-members';
import { BaseService } from 'src/core/services/base.service';
import { ProjectMembersRepository } from './project-members.repository';

@Injectable()
export class ProjectMembersService extends BaseService<ProjectMember> {

    constructor(repository : ProjectMembersRepository){
        super(repository)
    }

    async getAll() : Promise<ProjectMember[]>{
        return this.repository.findAll();
    }
}
