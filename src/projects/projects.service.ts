import { Injectable } from '@nestjs/common';
import { Projects } from 'src/core/models/projects';
import { BaseService } from 'src/core/services/base.service';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService extends BaseService<Projects> {
    constructor(repository : ProjectsRepository){
        super(repository)
    }
}
