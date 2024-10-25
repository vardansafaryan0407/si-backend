import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Projects } from 'src/core/models/projects';

@Controller('projects')
export class ProjectsController {

constructor(private projectsService : ProjectsService){}


@Get()
async getAll() : Promise<Projects[]>{
    return this.projectsService.getAll();
}




}
