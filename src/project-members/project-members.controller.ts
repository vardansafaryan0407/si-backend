import { Controller, Get } from '@nestjs/common';
import { ProjectMembersService } from './project-members.service';
import { ProjectMembers } from 'src/core/models/project.members';

@Controller('project-members')
export class ProjectMembersController {

    constructor(private projectMembersService : ProjectMembersService){}

    @Get()
    async getAll() : Promise<ProjectMembers[]>{
        return this.projectMembersService.getAll();
    }
}


