import { Injectable } from '@nestjs/common';
import { UserSkill } from 'src/core/models/user-skills';
import { BaseService } from 'src/core/services/base.service';
import { UserSkillsRepository } from './users-skills.repository';

@Injectable()
export class UsersSkillsService extends BaseService<UserSkill> {
    constructor(repository : UserSkillsRepository){
        super(repository)
    }


    async getAll() : Promise<UserSkill[]>{
        return this.repository.findAll();
    }
}
