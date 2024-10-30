import { Injectable } from '@nestjs/common';
import { Project } from 'src/core/models/projects';
import { BaseService } from 'src/core/services/base.service';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService extends BaseService<Project> {
    constructor(repository : ProjectsRepository){
        super(repository)
    }

    async getAll() : Promise<Project[]> {
        return this.repository.findAll();
    }
}
