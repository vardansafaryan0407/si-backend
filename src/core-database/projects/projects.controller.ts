import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from 'src/core/models/projects';

@Controller('projects')
export class ProjectsController {

constructor(private projectsService : ProjectsService){}


@Get()
async getAll() : Promise<Project[]>{
    return this.projectsService.getAll();
}




}
