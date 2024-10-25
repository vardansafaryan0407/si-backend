import { Injectable } from '@nestjs/common';
import { Skills } from 'src/core/models/skills';
import { BaseService } from 'src/core/services/base.service';
import { SkillsRepository } from './skills.repository';

@Injectable()
export class SkillsService  extends BaseService<Skills>{
    constructor (repository : SkillsRepository){
        super(repository)
    }


    async getAll() : Promise<Skills[]>{
        return this.repository.findAll();
    }
}
