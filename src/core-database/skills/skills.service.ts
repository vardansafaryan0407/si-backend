import { Injectable } from '@nestjs/common';
import { Skill} from 'src/core/models/skills';
import { BaseService } from 'src/core/services/base.service';
import { SkillsRepository } from './skills.repository';

@Injectable()
export class SkillsService  extends BaseService<Skill>{
    constructor (repository : SkillsRepository){
        super(repository)
    }


    async getAll() : Promise<Skill[]>{
        return this.repository.findAll();
    }
}
