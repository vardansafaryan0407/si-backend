import { Controller, Get } from '@nestjs/common';
import { ProjectMembersService } from './project-members.service';
import { ProjectMember } from 'src/core/models/project-member';

@Controller('project-members')
export class ProjectMembersController {

    constructor(private projectMembersService : ProjectMembersService){}

    @Get()
    async getAll() : Promise<ProjectMember[]>{
        return this.projectMembersService.findAll();
    }
}


